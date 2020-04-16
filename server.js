require("dotenv").config();
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APPLICATION_ID,
  privateKey: process.env.PRIVATE_KEY,
});

nexmo.dispatch.create(
  "failover",
  [
    {
      from: { type: "sms", number: process.env.FROM_NUMBER },
      to: { type: "sms", number: process.env.TO_NUMBER_1 },
      message: {
        content: {
          type: "text",
          text: "Hi Customer, your package will be delivered tomorrow",
        },
      },
      failover: {
        expiry_time: 180,
        condition_status: "read",
      },
    },
    {
      from: { type: "sms", number: process.env.FROM_NUMBER },
      to: { type: "sms", number: process.env.TO_NUMBER_2 },
      message: {
        content: {
          type: "text",
          text: "Hi Customer, here is a reminder message",
        },
      },
    },
  ],
  (err, data) => {
    if (err) {
      console.log("logging after error !!!", err);
    } else {
      console.log(data.dispatch_uuid);
    }
  }
);
