(function($, twttr){

  var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					maxZoom: 18,
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				}),
				center = L.latLng(36.0108858,-80.0160262),
      	map = L.map('map', {center: center, zoom: 10, layers: [tiles]});

  var southWest = L.latLng(35.850665,-80.346094),
      northEast = L.latLng(36.186469,-79.653),
      bounds = L.latLngBounds(southWest, northEast);

  function markerClick(){


    var marker = this;


    $('.leaflet-marker-icon').removeClass('active');
    $(marker._icon).addClass('active');

    var tweetBox = document.getElementById('tweet');
    if(!marker.data.tweetIdString){

      var id = marker.data.tweetId + '';
      marker.data.tweetIdString = id;

    };

    tweetBox.innerHTML = '';

    twttr.widgets.createTweet(
      marker.data.tweetIdString,
      document.getElementById('tweet'),
      {
        align: 'left'
      }).then(function (el) {

        if(el){

        } else {

          tweetBox.innerHTML = '<div><p>We\'re sorry this tweet was deleted</p></div>';
          io.socket.get('/tweet/destroy', {id: marker.data.id}, function (data, jwres){
            map.removeLayer(marker);
          });
        }
      });


  }



  $.getJSON('/api/v1/tweets?count=100', function(data){

    var tweets = data.tweets;

    for(var i = 0, x = tweets.length; i < x; i++){
      if(tweets[i].geo && tweets[i].geo.coordinates){
        var latlng = L.latLng(tweets[i].geo.coordinates),
            inBounds = bounds.contains(latlng);

        if(inBounds){

          var twitterAvatar = L.icon({
            iconUrl: tweets[i].avatar,

            iconSize:     [35, 35], // size of the icon
          });

          var marker = L.marker(latlng, {icon: twitterAvatar});
            marker.data = tweets[i];
            marker.on('click', markerClick);
            marker.addTo(map);
            var url = '/tweet/update/' + tweets[i];
        };
      }
    }

  });

  io.socket.on("tweet", function(event){

    if(event.data.geo && event.data.geo.coordinates){
      var latlng = L.latLng(event.data.geo.coordinates),
          inBounds = bounds.contains(latlng);

      if(inBounds){

        var twitterAvatar = L.icon({
          iconUrl: event.data.avatar,

          iconSize:     [30, 30], // size of the icon
        });

        var marker = L.marker(latlng, {icon: twitterAvatar});
          marker.data = event.data;
          marker.on('click', markerClick);
          marker.addTo(map);

          var url = '/tweet/update/' + event.data.id;
          io.socket.get(url, {inbounds:true}, function (data, jwres){});
      };

    };





  });
  io.socket.get("/tweet");

  L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);


})(jQuery, twttr);
