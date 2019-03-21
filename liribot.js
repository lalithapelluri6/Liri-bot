var fs = require("fs");

//NPM Packages

var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var axios = require("axios");

//Local Files
var keys = require("./keys.js");

//Creates an object to auth Spotify queries
var spotifyInfo = new Spotify(keys.spotifyKeys);

//Global Variables
var defaultMusic = "The Sign";
var defaultMovie = "Mr. Nobody";

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "spotify-this-song":
        mySpotify();
        break;
    case "movie-this":
        myMovie();
        break;
    case "my-band":
        myBand();
        break;
    case "do-what-it-says":
        random();
        break;
    default: // Adds user instructions to re-select an available action
        console.log("Please select an action request listed below:");
        console.log("my-band, spotify-this-song, movie-this, do-what-it-says");
        break;
}

// Spotify API
// -------------------------------------------------------------------
function mySpotify() {

    var spotifyInfo = new Spotify(keys.spotifyKeys);

    spotifyInfo.search({ type: 'track', query: value, limit: '1' }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
        } else {
            // Returns JSON info for selected track
            //console.log(JSON.stringify(data, null, 2));

            console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n ");
            console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n ");
            console.log("Album: " +JSON.stringify(data.tracks.items[0].album.name) + "\n ");
            console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));
        }
    });
};

//MOVIE DBM API
// -------------------------------------------------------------------

function myMovie() {

// Take in the command line arguments
    var nodeArgs = process.argv;

// Create an empty string for holding the movie name
    var movieName = "";

// Capture all the words in the movie name (ignore first 3 node arguments)
    for (var i = 3; i < nodeArgs.length; i++) {

// If TRUE, Build a string with the movie name.
        if (i > 3 && i < nodeArgs.length){
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

// Create URL query variable to store URL to request JSON from OMDB API
    var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movieName + "&tomatoes=true&y=&plot=short&r=json";
//console.log(queryUrl);

//Run request to the OMDB API with URL variable
    axios(queryUrl, function(error, response, data) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            var body = JSON.parse(data);

            //Then log the body details from the OMDB API
            console.log("\nMovie Title: " + body.Title + "\n ");
            console.log("Year Released: " + body.Released + "\n ");
            console.log("Rating: " + body.Rated + "\n ");
            console.log("Production Country: " + body.Country + "\n ");
            console.log("Language: " + body.Language + "\n ");
            console.log("Plot: " + body.Plot + "\n ");
            console.log("Actors: " + body.Actors + "\n ");
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].value + "\n ");
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);

        } else {
            console.log(error);
        };
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

    axios(queryUrl, function(error, response, data) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            var body = JSON.parse(data);

            //Then log the body details from the OMDB API
            console.log("\nBand Title: " + body.Title + "\n ");
            console.log("Artists: " + body.artists + "\n ");

        } else {
            console.log(error);
        };
    });

}

// DO-WHAT-IT-SAYS
// -------------------------------------------------------------------
// Function takes the data from my random.txt file and
// passes it as a search value in the Spotify function

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
            else if (arr[0] == "my-tweets") {
                myTweets();
            }
        }
    });
};
