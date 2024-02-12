const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/auth", async (req, res) => {
  const reqUrl = `https://accounts.zoho.com/oauth/v2/token?client_id=${req.body.client_id}&client_secret=${req.body.client_secret}&grant_type=authorization_code&redirect_uri=${req.body.redirect_uri}&code=${req.body.code}`;

  const response = await axios.post(reqUrl);

  res.send(response.data);
});

app.post("/api/organization", async (req, res) => {
  const reqUrl = `https://books.zoho.com/api/v3/organizations`;

  const response = await axios.get(reqUrl, {
    headers: {
      Authorization: `Zoho-oauthtoken ${req.body.access_token}`,
    },
  });

  res.send(response.data.organizations[0]);
});

//   const response = await axios.get(reqUrl);

//   res.send(response.data);
// });

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
