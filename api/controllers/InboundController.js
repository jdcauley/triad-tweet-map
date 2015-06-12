/**
 * InboundController
 *
 * @description :: Server-side logic for managing inbounds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	instagram: function(req, res){

		var params = req.params.all();

		console.log(params);

		res.ok();
		
	}

};
