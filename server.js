var paymentModule = require('iota-payment')
var express = require('express')
var app = express()
var bodyParser = require("body-parser");
var cors = require('cors');
const port = process.env.PORT


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static('frontend/dist'));

var options = {
    mount: '/payments',
    value: 0,
    websockets: true
    // ...
}

let server = paymentModule.createServer(app, options)

// Start server with iota-payment module on '/custom'
server.listen(port, function () {
    console.log(`Server started on port: ${port} `)
})
