var paymentModule = require('iota-payment')
var express = require('express')
var app = express()
var bodyParser = require("body-parser");
var cors = require('cors');
const port = process.env.PORT
const origins = process.env.allowed_origins.split(', ')
let maxPayoutValue = process.env.maxPayoutValue
if(Number.isInteger(maxPayoutValue)){
    throw 'Invalid maxPayoutValue in .env'
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var allowedOrigins = origins || ['http://localhost:8080', 'http://localhost:5000', 'http://192.168.178.22:5000'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use('/', express.static('frontend/dist'));

//reduce internal getBalance requests to max 1 in a minute
let lasttime = Date.now() - 60000
let lastbalance = 0

app.get("/get_balance", function (req, res) {
    if (Date.now() - 60000 > lasttime) {
        lasttime = Date.now()
        paymentModule.getBalance().then((balance) => {
            lastbalance = balance
            console.log("Balance: " + balance);
            res.send({ balance: balance });
        }).catch(err => {
            console.log("err", err)
        })
    } else {
        res.send({ balance: lastbalance });
    }
})

let ipaddresses = []
let ipaddresseslastminute = []
let blockedIpAddresses = []
let dailymaxPayoutsPerIP = process.env.dailymaxPayoutsPerIP
console.log("dailymaxPayoutsPerIP", dailymaxPayoutsPerIP);
let maxPayoutRequestsPerMinute = process.env.maxPayoutRequestsPerMinute
console.log("maxPayoutRequestsPerMinute", maxPayoutRequestsPerMinute);
let minPayoutIntervalinSeconds = process.env.minPayoutIntervalinSeconds*1000
console.log("minPayoutIntervalinSeconds", minPayoutIntervalinSeconds);
let lastpayouttime = Date.now() - minPayoutIntervalinSeconds-10000
//clear ipaddresseslastminute every minute
setInterval(()=>{
    ipaddresseslastminute = []
}, 60000)
//clear blockedIP every 24 h
setInterval(()=>{
    blockedIpAddresses = []
}, 86400000)


app.post("/pay_tokens", function (req, res) {
    console.log("pay_tokens called")
    let remoteAddress = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    ipaddresseslastminute.push(remoteAddress)
    if (ipaddresseslastminute.filter(x => x === remoteAddress).length >= maxPayoutRequestsPerMinute) {
        if(blockedIpAddresses.indexOf(remoteAddress) == -1){
            blockedIpAddresses.push(remoteAddress)
        }
        //delete in ipaddresses to decrease array size
        ipaddresses = ipaddresses.filter(x => x !== remoteAddress)
        res.send({ type: 'cantsend', msg: 'Max request per minute reached.' });
        return
    }
    //allow max one payout per time + max 10 seconds random
    if (Date.now() - minPayoutIntervalinSeconds - Math.floor(Math.random() *10000) < lastpayouttime) {
        res.send({ type: 'cantsend', msg: 'Please try again later.' });
        return
    }
    //check ip address is blocked
    if(blockedIpAddresses.indexOf(remoteAddress) != -1){
        res.send({ type: 'cantsend', msg: 'Max request already reached.' });
        return
    }
    let address = req.body.address;
    let value = req.body.value || 0;
    //limit message length to 1 tx
    let message = req.body.message.slice(0, 1093) || 'EINFACHIOTA';
    let tag = req.body.tag || 'EINFACHIOTA';
    console.log("address", address)
    console.log("value", value)
    if (value > process.env.maxPayoutValue) {
        value = process.env.maxPayoutValue
    }
    let payoutObject = {
        //required
        address: address,
        value: value,
        //optional
        message: message,
        tag: tag,
        //indexes for input addresses, only in special cases required
        // startIndex: 0,
        // endIndex: 1
    }
    paymentModule.sendPayout(payoutObject)
        .then(result => {
            console.log("result", result)
            ipaddresses.push(remoteAddress)
            //check if maxpayouts is reached and push to blocked adresses
            if (ipaddresses.filter(x => x === remoteAddress).length >= dailymaxPayoutsPerIP) {
                blockedIpAddresses.push(remoteAddress)
                //delete in ipaddresses to decrease array size
                ipaddresses = ipaddresses.filter(x => x !== remoteAddress)
            }
            lastpayouttime = Date.now()
            res.send(result);
        })
        .catch(err => {
            console.log(err)
            res.send({type: 'error', msg:err});
        })
})

var options = {
    websockets: true,
    api: true
}

let server = paymentModule.createServer(app, options)

// Start server
server.listen(port, function () {
    console.log(`Server started on port: ${port} `)
})
