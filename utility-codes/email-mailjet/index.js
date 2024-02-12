const dotenv = require("dotenv");
dotenv.config();

const Mailjet = require("node-mailjet");

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

const request = mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "buildsourcebay@gmail.com",
        Name: "Sameer Ingavale",
      },
      To: [
        {
          Email: "harsh9hegishte@gmail.com",
          Name: "Harsh Hegishte",
        },
      ],
      Subject: "Your email flight plan!",
      TextPart:
        "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
      HTMLPart:
        '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
    },
  ],
});

request
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
