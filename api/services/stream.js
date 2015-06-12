
var Twitter = require('twitter');
var ig = require('instagram-node').instagram();

var twitter = new Twitter({
  consumer_key: sails.config.secrets.twitter.consumer_key,
  consumer_secret: sails.config.secrets.twitter.consumer_secret,
  access_token_key: sails.config.secrets.twitter.access_token_key,
  access_token_secret: sails.config.secrets.twitter.access_token_secret
});

ig.use({ client_id: sails.config.secrets.instagram.id,
         client_secret: sails.config.secrets.instagram.secret });

module.exports = {

  start: function(){

// 		twitter.stream('statuses/filter', {locations: '-80.346094,35.850665,-79.653,36.186469'},  function(stream){

//       stream.on('data', function(tweet) {

//         if(tweet.coordinates || tweet.geo){
//           Tweet.create({
//             tweetId: tweet.id,
//             tweetIdString: tweet.id_str,
//             text: tweet.text,
//             userId: tweet.user.id,
//             userName: tweet.user.name,
//             userUrl: tweet.user.url,
//             userScreename: tweet.user.screen_name,
//             userLocation: tweet.user.location,
//             userDesc: tweet.user.description,
//             userVerified: tweet.user.verified,
//             avatar: tweet.user.profile_image_url,
//             avatarSecure: tweet.user.profile_image_url_https,
//             coordinates: tweet.coordinates,
//             geo: tweet.geo,
//             place: tweet.place,
//             timestamp: tweet.timestamp_ms
//           }, function(err, status){
//   					if(err){
//   						Tweet.publishCreate(err);
//   					}
//   					if(status){
//   						Tweet.publishCreate(status);

//   					}

//   				});

//         };

// 			});

//       stream.on('error', function(error) {
//       	console.log(error);
//     	});
    
//   	});
    ig.del_subscription({ all: true }, function(err, subscriptions, remaining, limit){
        if(err) {
            console.log(err);
        } else {
            ig.location_search({ lat: 36.066964, lng: -79.793553 }, [5000], function(err, result, remaining, limit) {

                if(err) console.log(err);

                if(result){
            
                    async.eachSeries(result, function(location, asyncCB){
                        ig.add_location_subscription(location.id, 'http://52.7.113.209:1337/inbound/instagram', '51799897.953495a.d8e94ac067294a82838a1600a29a08f8', function(err, result, remaining, limit){
                            console.log(result);
                            asyncCB();
                        });
                    }, function(err){
                        console.log('async done'); 
                    });
                }
    
    
            });
            
        }
        
      });
    


  }

};
