# MixMax90

This project was built upon [the original repo](https://github.com/joshuajcarter/mixmax90) by [Joshua Carter](https://joshuajcarter.com/).
The one-week task was to take the original project and refactor it, add features, convert all of the code to Typescript, and add tests.

This was done in collaboration with [Diego Saborido](https://github.com/diegosarkissian), as paired programming.

# The Challenge

Although we both really liked the look of the original product from a presentation that was given, after deciding on this app and forking it, it became apparent that a lot of the demonstrated functionality was hard-coded. Nonetheless we carried on and came out the other side with a great app that we are both very proud of.

# The Changes

- All API requests were moved to a dedicated API service (original implementation had all API calls in the Search component).
- Front-end variables were renamed to be more semantic, and the logic flow was improved to enhance readability and to ensure each component was pure.
- The server and front-end was refactored to be in TypeScript.
- Added the ability to refresh the retrieved playlist in the case the user wanted to get a new one for the same artist.
- Added the ability to save the current playlist to a database.
- Added the ability to browse saved playlists (original implementation was hard-coded and not actually parsing the database).
- Added a landing page to display a message if the front-end cannot connect to the server (included adding some error handling in the server).
- Made the playlist generator retrieve approx 90 minutes worth of tracks (original implementation was randomised), and every retrieved song is unique.
- Changed it from the original implementation so that an access token would not be requested on every single API request.
- Added tests to the back-end.
- Added the ability to preview the audio of each track.

# Screenshots & Video Demo

[Video Demo (YouTube)](https://youtu.be/G4hpt0uq8e4)

![](/screenshots/initial-state.png)
![](/screenshots/artist-search.png)
![](/screenshots/playlist-results.png)
![](/screenshots/saved-playlists.png)

# How To Run

To run locally you will need the following:

You will need access to an instance of MongoDB, either locally or cloud hosted.
Place the URI to your database in ./server/.env following the format from .env.example.

You will also need a Spotify account to use this app.
Get an API key and client secret from [Spotify for Developers.](https://developer.spotify.com/documentation/web-api)
Place these keys in ./client-ts/.env, following the example formatting from .env.example.

In ./server & ./client-ts run `npm i`.
In ./server run `npm run dev`, and also in ./client-ts.
