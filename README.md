# Liri-bot
## Liri Bot Homework - Language Interpretation and Recognition Interface | Node.js & Command Line
### Overview
    In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, 
    LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
    
#### liri.js can take in one of the following commands:
      spotify-this-song
      
      my-movie
      
      my-band
      
      do-what-it-says
##### What Each Command Should Do

node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window

Artist(s)

The song's name

A preview link of the song from Spotify

The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

###### node liri.js movie-this '<movie name here>'
       
       This will output the following information to your terminal/bash window:
       
         * Title of the movie.
         * Year the movie came out.
         * IMDB Rating of the movie.
         * Country where the movie was produced.
         * Language of the movie.
         * Plot of the movie.
         * Actors in the movie.
         * Rotten Tomatoes URL.
####### node liri.js my-band 'band name'
        This will output information to your terminal/bash window:
        
        * Band Title
        * Band artists

