const express = require("express");
const cors = require("cors");
const needle = require("needle");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//all subcribers active list
app.get("/api/list", async (req, res) => {
  await needle("get", process.env.API_URL_ALL_SUBS, {
    username: process.env.API_KEY,
  })
    .then((result) => {
      res.status(200).json(result.body.Results);
    })
    .catch((error) => {
      console.error(error);
    });
});

//add new subscriber
app.post("/api/list", async (req, res) => {
  var tmp_data = JSON.parse(Object.keys(req.body)[0]).subscriber;

  var data = {
    EmailAddress: tmp_data.EmailAddress,
    Name: tmp_data.Name,
    ConsentToTrack: "Yes",
    CustomFields: [{ Key: "CustomKey", Value: "Some Value" }],
  };

  await needle("post", process.env.API_URL_ADD_SUB, data, {
    json: true,
    username: process.env.API_KEY,
  })
    .then((result) => {
      res.status(200).json("A new subscriber added!");
    })
    .catch((error) => {
      console.error(error);
    });
});

//remove from active subscriber
app.post("/api/list/unsub", async (req, res) => {
  await needle("post", process.env.API_URL_DEL_SUB, req.body, {
    json: true,
    username: process.env.API_KEY,
  })
    .then((result) => {
      res.status(200).json("A subscriber has been unsubscribed!");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
