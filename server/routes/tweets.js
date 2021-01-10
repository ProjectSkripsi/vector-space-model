const express = require("express");
const router = express.Router();
const { getTweet } = require("../controllers/tweetController");

/* GET users listing. */
router.get("/", getTweet);

module.exports = router;
