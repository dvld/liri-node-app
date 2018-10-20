// env file
require('dotenv').config();

// requires
var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var movieName = process.argv[3];
var liriReturn = process.argv[2];

// switch/case commands
switch (liriReturn) {

  case "concert-this":
    concertThis();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
};

// create function to call Bands in Town "concert this"

// create function to call spotify "spotify this song"

// create function to call omdb "movie this"

// create function "do what it says"