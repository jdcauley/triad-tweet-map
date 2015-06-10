/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	stored: function(req, res){

		var params = req.params.all();

		var tweetQuery = Tweet.find();
		tweetQuery.sort('createdAt DESC')

		if(params.terms){

		}

		if(params.count){
			tweetQuery.limit(params.count);
		} else {
			tweetQuery.limit(30);
		}

		if(params.offset){
			tweetQuery.offset(params.offset);
		}


		tweetQuery.exec(function(err, tweets){
			if(err){
				return res.badRequest({
					error: err
				});
			}
			if(tweets){
				return res.json({
					tweets: tweets
				});
			}
		});

	}

};
