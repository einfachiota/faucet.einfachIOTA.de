# IOTA faucet

Create a .env file as described here https://github.com/machineeconomy/iota-payment with devnet nodes

and add

```bash
PORT=3001
VALUE=1
allowed_origins=http://localhost:8080, http://localhost:5000, http://192.168.178.22:5000
```

Create a .env in the frontend folder with an URL, all requests will be sent to it

```bash
VUE_APP_URL=http://localhost
VUE_APP_NETWORK=Devnet
```
