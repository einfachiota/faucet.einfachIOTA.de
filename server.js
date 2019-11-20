var paymentModule = require('iota-payment')
var express = require('express')
var app = express()
var bodyParser = require("body-parser");
var cors = require('cors');
const port = process.env.PORT


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var allowedOrigins = ['http://localhost:8080'];
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

app.get("/total_balance", function (req, res) {
    console.log("total_balance called")
    paymentModule.getBalance().then((balance) => {
        console.log("balance", balance)
        res.send({ balance: balance});
    }).catch(err => {
        console.log("err", err)
    })
})

app.post("/pay_tokens", function (req, res) {
    console.log("pay_tokens called")
    var address = req.body.address;
    var value = req.body.value || 0;
    var message = req.body.message || 'EINFACHIOTA';
    var tag = req.body.tag || 'EINFACHIOTA';
    console.log("address", address)
    console.log("value", value)
    if(value > 1000){
      value = 1000
    }
    let payoutObject = {
        //required
        address: address,
        value: value,
        //optional
        message: message,
        tag: tag,
        //indexes for input addresses, only in special cases required
        // starIndex: 0,
        // endIndex: 1
    }
    paymentModule.payout.send(payoutObject)
        .then(result => {
            console.log("result", result)
            res.send(result);
        })
        .catch(err => {
            console.log(err)
            res.send(err);

        })
})

var options = {
    mount: '/payments',
    value: 1,
    websockets: true
    // ...
}

let server = paymentModule.createServer(app, options)

// Start server with iota-payment module on '/custom'
server.listen(port, function () {
    console.log(`Server started on port: ${port} `)
})
