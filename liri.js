require("dotenv").config();

var fs = require("fs");

//npm packages

var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var moment = require("moment");

//local files
var keys = require("./keys.js");

//global variables
var defaultMusic = "The sign";
var defaultMovie = "Mr.Nobody";

var action = process.argv;
var value = process.argv[2];

//Creates an object to auth Spotify queries


switch(action) {
    case "my-movie":
        myMovie();
        break;
    case "spotify-this-song":
        mySpotify();
        break;
    case "my-band":
        myband();
        break;
    case "do-what-it-says":
        random();
        break;

    default: // Adds user instructions to re-select an available action
        console.log("Please select an action request listed below:");
        console.log("my-movie, spotify-this-song, my-band, do-what-it-says");
        // inquirer.prompt([
        //     {
        //         name: "my-movie",
        //         message: "What is your favorite movie?"
        //     }, {
        //         name: "spotify-this-song",
        //         message: "What is your favorite song?"
        //     },  {
        //         name: "my-band",
        //         message: "What is your favorite band"
        //     }
        // ]);
break;
}

// Spotify API
// -------------------------------------------------------------------

function mySpotify() {
    var spotifyInfo = new Spotify(keys.spotifyKeys);

    spotifyInfo.search({ type: 'track', query: value, limit: '1'}, function(err, data) {
        if (err) {
            console.log('Error occured: ' + err);
        } else {
            console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n");
            console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n");
            console.log("Album " + JSON.stringify(data.tracks.items[0].album.name) + "\n");
            console.log("Link: " + JSON.stringify(data.tracks.itmes[0].album.external_urls));
        }
    });
};

function myMovie() {

// Take in the command line arguments
    var nodeArgs = process.argv;

// Create an empty string for holding the movie name
    var movieName = "";

// Capture all the words in the movie name (ignore first 3 node arguments
    for (var i = 3; i < nodeArgs.length; i++) {

// If TRUE, Build a string with the movie name.
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // Run request to OMDB API with URL varible
    axios.get(queryUrl).then( function(error, response, body) {
                console.log(response);
        // If the request was successful ...
        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);

            // Then log the body details from the OMDB API
            console.log("\nMovie Title: " + data.Title + "\n ");
            console.log("Year Released: " + data.Released + "\n ");
            console.log("Rating: " + data.Rated + "\n ");
            console.log("Production Country: " + data.Country + "\n ");
            console.log("Language: " + data.Language + "\n ");
            console.log("Plot: " + data.Plot + "\n ");
            console.log("Actors: " + data.Actors + "\n ");
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].value + "\n ");
            console.log("Rotten Tomatoes URL: " + data.tomatoURL);
        } else {
            console.log(error);
        }
    });
}

function myBand() {
    var nodeArgs = process.argv;

    var bandName = "";

    for (var i = 3; i < nodeArgs.length; i++) {

// If TRUE, Build a string with the movie name.
        if (i > 3 && i < nodeArgs.length){
            bandName = bandName + "+" + nodeArgs[i];
        } else {
            bandName += nodeArgs[i];
        }
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function(error, response) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            var body = JSON.parse(response.data);

            //Then log the body details from the OMDB API
            console.log("\nBand Title: " + body.Title + "\n ");
            console.log("Artists: " + body.artist + "\n ");

        } else {
            console.log(error);
        };
    });

}


function random() {

    fs.readFile('./random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log(data);

            //Converst data in text file into array
            var arr = data.split(",");
            value = arr[1];
            // If command name at index[0] matches the string, invoke the function
            if(arr[0] == "movie-this") {
                myMovie(value);
            }
            else if (arr[0] == "spotify-this-song") {
                mySpotify(value);
            }
        }
    });
};

