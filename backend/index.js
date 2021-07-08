const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const ethUtil = require('ethereumjs-util');
const ethSigUtil = require('eth-sig-util')
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/token", (req, res) => {
  let nonce = Math.floor(Math.random() * 1000000).toString(); // in a real life scenario we would random this after each login and fetch it from the db as well
  return res.send(nonce);
});
app.post("/auth", (req, res) => {

  const { address, signature, nonce } = req.body;

  const msg = `I am signing my one-time nonce: ${nonce}`;
  const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
  const recoveredAddress = ethSigUtil.recoverPersonalSignature({
    data: msgBufferHex,
    sig: signature,
  });

  if (recoveredAddress !== address) {
    return res.status(401).send();
  }

  res.send({ status: 'success' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
