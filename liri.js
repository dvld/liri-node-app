
// dependencies
// _____________________________________________

// env file
require('dotenv').config();

// requires
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");

// init spotify api client
var spotify = new Spotify(keys.spotify);

// _________

// functions
// ______________________________________________

var getArtist = function (artist) {

  return artist.name;

};

// _________

var getSpotify = function (songName) {

  if (songName === undefined) {

    songName = "The Sign";

  }

  spotify.search(

    {
      type: "track",
      query: songName
    },

    function (error, data) {

      if (error) {

        console.log("Error occured: " + error);

        return;

      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {

        console.log(i);
        console.log("Artist(s): " + songs[i].artist.map(getArtist));
        console.log("Song name: " + songs[i].name);
        console.log("Preview song: " + songs[i].preview_url);
        console.log("Album: " + songs[i].album.name);

      }

    }
  );
};

// _________

var getBands = function (artist) {

  var queryURL = "https:rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(

    function (response) {

      var jsonData = response.data;

      if (!jsonData.length) {

        console.log("No results found for " + artist);

        return;

      }

      console.log("Upcoming concerts for " + artist + ":");

      for (var i = 0; i < jsonData.length; i++) {

        var show = jsonData[i];

        console.log(
          show.venue.city + "," +
          (show.venue.region || show.venue.country) +
          " at " +
          show.venue.name +
          " " +
          moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};

// _________

var getMovie = function (movieName) {

  if (movieName === undefined) {

    movieName = "Mr Nobody";

  }

  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(url).then(

    function (response) {

      var jsonData = response.data;

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);

    }
  );
};

// _________

var doWhatItSays = function () {

  fs.readFile("random.txt", "utf8", function (error, data) {

    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {

      choose(dataArr[0], dataArr[1]);

    } else if (dataArr.length === 1) {

      choose(dataArr[0]);

    }
  });
};

// _________

var choose = function (caseData, functionData) {

  switch (caseData) {

    case "spotify-this-song":
      getSpotify(functionData);
      break;

    case "concert-this":
      getBands(functionData);
      break;

    case "movie-this":
      getMovie(functionData);
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;

    default:
      console.log("LIRI doesn't know that");

  }
};

// _________

var run = function (argOne, argTwo) {

  choose(argOne, argTwo);

};

// ___________________________________________________

run(process.argv[2], process.argv.slice(3).join(" "));