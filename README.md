# IOTA faucet

Create a .env file as described here https://github.com/machineeconomy/iota-payment

Example:

```bash
SEED='81TrytesSeed'
IOTANODE='https://nodes.devnet.thetangle.org'
FALLBACKNODE='https://nodes.devnet.iota.org'
MAX_PAYMENT_TIME=4320
PORT=3001
VALUE=1
debug=basic
socket_origins=http://localhost:* http://localhost:* http://127.0.0.1:* http://192.168.178.22:* http://192.168.178.22:* https://faucet.einfachiota.de:*
allowed_origins=http://localhost:8080, http://localhost:5000, http://192.168.178.22:5000, http://192.168.178.22:8080, https://faucet.einfachiota.de
maxPayoutsPerIP=20
minPayoutIntervalinSeconds=20
maxPayoutRequestsPerMinute=6
```

Create a .env in the frontend folder with an URL, all requests will be sent to it
Choose between Devnet and Mainnet

```bash
VUE_APP_URL=http://192.168.178.22:3001
VUE_APP_NETWORK=Devnet
```
