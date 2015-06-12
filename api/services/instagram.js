
var ig = require('instagram-node').instagram();
ig.use({ client_id: sails.config.secrets.instagram.id,
         client_secret: sails.config.secrets.instagram.secret });
         
module.exports = {

  location: function(params){
      console.log('in service');
      console.log(params);
      ig.media_search(36.143635, -79.881991, [null, null, null, null], function(err, media, remaining, limit) {
          if(err) console.log(err);
          if(media) console.log(media);
          if(media){
            console.log(media.length);
            async.eachSeries(media, function(gram, asyncCB){
              
              Status.findOne({gramId: gram.id}, function(err, found){
                  if(err){
                      asyncCB();
                  }
                  if(found){
                      asyncCB();
                  } else {
                      Status.create({gramId: gram.id, gramUsername: gram.user.username, gramUserId: gram.user.id, full: gram}, function(err, saved){
                        if(err){
                            asyncCB();
                        }
                        if(saved){
                            asyncCB();
                        }
                    });
                  }
              });
              
            }, function(err){
              if(err) console.log(err);
              console.log('Async Done');
            })
          }
          
      });
    

  }

}
