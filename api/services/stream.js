
var Twitter = require('twitter');

var twitter = new Twitter({
  consumer_key: sails.config.secrets.twitter.consumer_key,
  consumer_secret: sails.config.secrets.twitter.consumer_secret,
  access_token_key: sails.config.secrets.twitter.access_token_key,
  access_token_secret: sails.config.secrets.twitter.access_token_secret
});

module.exports = {

  start: function(){

		twitter.stream('statuses/filter', {locations: '-80.346094,35.850665,-79.653,36.186469'},  function(stream){

      stream.on('data', function(tweet) {

        if(tweet.coordinates || tweet.geo){

          Tweet.create({
            tweetId: tweet.id,
            text: tweet.text,
            userId: tweet.user.id,
            userName: tweet.user.name,
            userUrl: tweet.user.url,
            userScreename: tweet.user.screen_name,
            userLocation: tweet.user.location,
            userDesc: tweet.user.description,
            userVerified: tweet.user.verified,
            avatar: tweet.user.profile_image_url,
            avatarSecure: tweet.user.profile_image_url_https,
            coordinates: tweet.coordinates,
            geo: tweet.geo,
            place: tweet.place,
          }, function(err, status){
  					if(err){
  						Tweet.publishCreate(err);
  					}
  					if(status){
  						Tweet.publishCreate(status);

  					}

  				});

        };

			});

      stream.on('error', function(error) {
      	console.log(error);
    	});

  	});

  }

};
