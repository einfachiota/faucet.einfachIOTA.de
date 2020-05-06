# IOTA faucet

Create a .env file as described here https://github.com/iota-pay/iota-payment-module and add the values below

Example:

```bash
SEED=81TrytesSeed
iotaNodes=["https://nodes.comnet.thetangle.org:443"]
PORT=3001
#value for the payments
VALUE=1
debug=basic
socketOrigins=['http://localhost:*', 'http://127.0.0.1:*', 'https://faucet.einfachiota.de:*']
allowed_origins=http://localhost:8080, http://localhost:5000, https://faucet.einfachiota.de
#a single IP can request that many payouts in 24h
dailymaxPayoutsPerIP=100
#global minimum time between two payout requests for all clients
minPayoutIntervalinSeconds=7
#max request you can send from a single IP per minute
maxPayoutRequestsPerMinute=7
#time until a new receiving address can be requested
minPaymentIntervals=60
maxPayoutValue=1000
```

Create a .env in the frontend folder with an URL, all requests will be sent to it
Choose between Comnet and Mainnet

```bash
VUE_APP_URL=https://faucet.einfachiota.de
VUE_APP_NETWORK=Comnet
VUE_APP_MAXVALUE=1000
VUE_APP_TANGLE_EXPLORER=https://comnet.thetangle.org
```
