LIRI-NODE-APP

1.Overview

In this assignment, an application called  LIRI has been coded. It is a command line node app that takes in parameters 
and gives you back data.

2. What Each Command does

   - node liri.js concert-this <artist/band name here>.
      It searchs the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 
      for an artist and render the following information about each event to the terminal. An example using the band "u2" is shown in 
      figure #1 listed in the images folder.
      
   - node liri.js spotify-this-song '<song name here>
       This will show the following information about the song in your terminal/bash window

        * Artist(s)

        * The song's name

        * A preview link of the song from Spotify

        * The album that the song is from
        
        An example using the song "my heart will go on" is shown in  figure #2 listed in the images folder.

        * If no song is provided then your program will default to "The Sign" by Ace of Base. An example
          using this option is shown in  figure #5 listed in the images folder.
        
        
    - node liri.js movie-this '<movie name here>
      This will output the following information to your terminal/bash window:

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

       An example using the movie "superman" is shown in  figure #3 listed in the images folder.
       
       * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' An example
       using this option is shown in  figure #6 listed in the images folder.
      
    - node liri.js do-what-it-says
     
       Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of 
       LIRI's commands.

       * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        
       An example using this option is shown in  figure #4 listed in the images folder.
        
       An example editing the file random.txt with this content: movie-this,"Forrest Gump" This option is shown in  
       figure #7 listed in the images folder.
     
      
       
       

      
      
      ￼
      
      
      
      

