//Require for the npm packages required to run the application

dotenv = require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");

//Global variables
var action = process.argv[2];
var inputUser = process.argv.slice(3).join(" ");


// Block of code that tell the action that the app will be doing

switch (action) {
    case "concert-this":
        concertthis();
        break;

    case "spotify-this-song":
        spotifythis();
        break;

    case "movie-this":
        moviethis();
        break;

    case "do-what-it-says":
        dowhatitsays();
        break;
    default:
        console.log('\n ==== please try any of these ====' +
            '\n PLEASE RUN ONE OF THE COMMANDS BELOW:' +
            '\n node liri.js concert-this "any artist or band"' +
            '\n node liri.js spotify-this-song "any song name"' +
            '\n node liri.js movie-this "any movie name"' +
            '\n node liri.js do-what-it-says' +
            '\n');
};

// Section for function called concertthis();

function concertthis() {

    let artist = inputUser;


    // Then run a request with axios to  Bands in Town Artist Events API with the artist / Music Band specified
    const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data[0].datetime);

            let infoArtist =
                "\n Name of the artist: " + artist +
                "\n Name of the venue: " + response.data[0].venue.name +
                "\n Venue location: " + response.data[0].venue.city + "," + response.data[0].venue.country +
                "\n Date of the Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY") +
                "\n"

            console.log(infoArtist);

            // function called appendtofile that append the results to the log.txt file
            appendtofile(infoArtist);


        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

// Section for function called spotifythis();

function spotifythis() {

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });


    let songName = inputUser;
    // let songName2 = inputUser2;

    // if the user does not input any song
    if (!songName) {
        songName = "The Sign";
    }


    // Search the song name in spotify api
    spotify.search({ type: "track", query: songName }, function (err, data) {

        if (err) {
            return console.log("error")
        } else {

            let infoSong =
                "\n  artist(s): " + data.tracks.items[0].album.artists[0].name +
                "\n  song's name: " + songName +
                "\n  Preview link of the song from Spotify: " + data.tracks.items[0].album.external_urls.spotify +
                "\n  The album is from: " + data.tracks.items[0].album.name +
                "\n"

            console.log(infoSong);

            // function called appendtofile that append the results to the log.txt file
            appendtofile(infoSong);
        }

    });
}


// Section for function called movies();

function moviethis() {

    let movieName = inputUser;

      // if the user does not input any movie name
    if (!movieName) {
        movieName = "Mr. Nobody.";
    }

    // Then run a request with axios to the OMDB API with the movie specified
    const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    axios.get(queryUrl).then(
        function (response) {

            let infoMovies =
                "\n Movie's Title: " + response.data.Title +
                "\n Release Year: " + response.data.Year +
                "\n The movie's rating is: " + response.data.imdbRating +
                "\n Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value +
                "\n Country where the movie was produced: " + response.data.Country +
                "\n Language of the movie: " + response.data.Language +
                "\n Plot of the movie: " + response.data.Plot +
                "\n Actors in the movie: " + response.data.Actors +
                "\n"

            console.log(infoMovies);

            // function called appendtofile that append the results to the log.txt file
            appendtofile(infoMovies);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

// Section for function called dowhatitsays();

function dowhatitsays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        action = output[0];
        inputUser = output[1];


        switch (action) {
            case "concert-this":
                concertthis();
                break;

            case "spotify-this-song":
                spotifythis();
                break;

            case "movie-this":
                moviethis();
                break;

            case "do-what-it-says":
                dowhatitsays();
                break;
            default:
                console.log('\n ==== please try any of these ====' +
                    '\n PLEASE RUN ONE OF THE COMMANDS BELOW:' +
                    '\n node liri.js concert-this "any artist or band"' +
                    '\n node liri.js spotify-this-song "any song name"' +
                    '\n node liri.js movie-this "any movie name"' +
                    '\n node liri.js do-what-it-says' +
                    '\n');
        };

    });
}

// Section for the function called appendtofile(), which basic add the results from any of the sub-apps (i.e., spotify, etc)
// to the file log.txt, without over-writing this file.

function appendtofile(data) {

    fs.appendFile("log.txt", data, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added to the log.txt file!");
        }

    });


}

