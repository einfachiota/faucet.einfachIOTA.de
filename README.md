# IOTA faucet

Create a .env file as described here https://github.com/machineeconomy/iota-payment

Example:

```bash
SEED='81TrytesSeed'
iotaNodes=["https://nodes.comnet.thetangle.org:443"]
PORT=3001
VALUE=1
debug=basic
socketOrigins=['http://localhost:*', 'http://127.0.0.1:*', 'https://faucet.einfachiota.de:*']
allowed_origins=http://localhost:8080, http://localhost:5000, https://faucet.einfachiota.de
dailymaxPayoutsPerIP=100
minPayoutIntervalinSeconds=7
maxPayoutRequestsPerMinute=7
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
