const axios = require("axios");
const createError = require("http-errors");


exports.search = function (req, res) {
  const searchParam = req.params.search
  const searchType = req.params.type
  const searchLimit = req.params.limit

  const options = {
    method: "GET",
    url: `https://${process.env.SPOTIFY_API_HOST}/search/`,
    params: {
      q: searchParam,
      type: searchType,
      offset: "0",
      limit: searchLimit,
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": `${process.env.SPOTIFY_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.SPOTIFY_API_HOST}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });
};

exports.artist = function (req, res) {
  console.log("artist uri is " + req.params.uri);
  const searchParam = req.params.uri;

  const options = {
    method: 'GET',
    url: `https://${process.env.SPOTIFY_API_HOST}/artist_overview/`,
    params: { id: searchParam },
    headers: {
      'X-RapidAPI-Key': `${process.env.SPOTIFY_API_KEY}`,
      'X-RapidAPI-Host': `${process.env.SPOTIFY_API_HOST}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data)
    }).catch(function (error) {
      console.log("an error has occurred :( ")
      console.error(error);
    });
}