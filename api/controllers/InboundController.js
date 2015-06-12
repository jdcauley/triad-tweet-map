/**
 * InboundController
 *
 * @description :: Server-side logic for managing inbounds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	instagram: function(req, res){
        console.log('hit');
		var params = req.params.all();

		console.log(params);
		
		if(params['hub.challenge']){
		  res.ok(params['hub.challenge']);
		} else {
		  
		  instagram.location(params);
		  res.ok();
		}
        
		
// 		ig.media('media_id', function(err, media, remaining, limit) {
		    
// 		});

		
		
	}

};
