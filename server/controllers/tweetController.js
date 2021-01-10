const e = require("express");
const client = require("../helpers/twitterService");

module.exports = {
  getTweet: (req, res) => {
    let loc = "-6.2000,106.816666,400km";
    client.get(
      "search/tweets",
      { q: "#covid", count: 2 },
      function (error, tweets, response) {
        if (!error) {
          console.log(tweets.statuses.length);
          res.status(200).json(tweets);
        } else {
          res.status(500).json(error);
        }
      }
    );
  },
};
