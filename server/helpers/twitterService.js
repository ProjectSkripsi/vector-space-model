const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: "11HqP6GeMu08eTHjDRwqroOF1",
  consumer_secret: "4ONLczOvWH8YSpfOvwdrZhBAThlSnMqCuVmGAvihQv08gWHoZF",
  bearer_token:
    "AAAAAAAAAAAAAAAAAAAAAFogLgEAAAAA72IXEJlZwFa2YYiZZ5a6tdMqFus%3D9JMfCsntCD2FZayB1BieUBJL2YYH1poFhjbVjRie55dWNrO5OZ",

  // access_token_key: "",
  // access_token_secret: "",
});

module.exports = client;
