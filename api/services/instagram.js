
var ig = require('instagram-node').instagram();
ig.use({ client_id: sails.config.secrets.instagram.id,
         client_secret: sails.config.secrets.instagram.secret });
         
module.exports = {

  location: function(params){
      console.log('in service');
    ig.location_search({ lat: 36.143635, lng: -79.881991 }, 5000, function(err, result, remaining, limit) {

      if(result){
        console.log(result);
        
        async.eachSeries(result, function(location, asyncCB){
            
            ig.location_media_recent(location.id, [null, null, params[0].timestamp, params[0].timestamp], function(err, media, pagination, remaining, limit) {
                if(err) console.log(err);
                
                if(media){
                    console.log(media);
                    asyncCB();
                }
            });    
            
        }, function(err){
            console.log('async done');
        });
        
      }
      
    });

  }

}
