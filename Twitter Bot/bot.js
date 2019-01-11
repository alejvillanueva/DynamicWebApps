/*Setting up Twit*/
var Twit = require('twit');
var configT = require('./configTwitter');
var T = new Twit(configT);

/*Seting up Spotify*/
var SpotifyWebApi = require('spotify-web-api-node');
var configS = require('./configSpotify.js');
var S = new SpotifyWebApi(configS);

/*Filtering realtime tweets for mentions of bot twitter handle*/
var stream = T.stream('statuses/filter', {track: "@wordtosong"})
stream.on('tweet', repliedReceived);

/*Function run everytime a new tweet is found to get word and user who tweeted*/
function repliedReceived(event){
	var user = event.user.screen_name;

	/*Figures out if word or mention is first*/
	if(event.text.split(' ')[0] === ("@wordtosong")){ 
		var word = event.text.split(' ')[1];
	} else{
		var word = event.text.split(' ')[0];
	}

	/*Calls functin to find song */
	getSong(word,user);
}

//Get Spotify authorization token and then gets data from Spotify*/
function getSong(word, replyTo){
	S.clientCredentialsGrant().then(
		function(data) {

		    // Save the access token so that it's used in future calls
		    S.setAccessToken(data.body['access_token']);

		    return S.searchTracks(word)
		}).then(function(data){
			var songs = data.body.tracks.items; //Retuns specifically songs that came from search
			var song = songs[0]; //first song result
			if(song != undefined){ //if a song was found
				songPick = {
					name: song.name,
					uri: `https://open.spotify.com/track/${song.id}`,
					artists: song.artists.map((artists) => {return artists['name']})

				}
				return songPick
			}
			return undefined; //if no song was found
		}).then(function(songPick){
			tweeter(songPick, replyTo) //calls function to post to twitter
		}).catch(function(err) {
			console.log(err);
		});
	}


// The bot that tweets!!
function tweeter(songPick, replyTo) {

  //If a song was not found
  if(songPick === undefined){
  	var tweet = "Sorry, @" + replyTo + ". I couldn't find a song";
  }
  else{ //A song was found!!
  	var tweet = "@" + replyTo + " Here is your song:  " + songPick.name + " " + songPick.artists + " " + songPick.uri;
  }

  //console.log(tweet);

  
  // Post that tweet!
  T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
  	if (err) {
  		console.log(err);
  	}
  }

}
