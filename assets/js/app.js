(function($){

  function markerClick(){

    var tweetBox = document.getElementById('tweet');

    tweetBox.innerHTML = '<h1><a href="https://twitter.com/@' + this.data.userScreename + '">@' + this.data.userScreename + '</a></h1>' +
                         '<p class="tweet-text">' + this.data.text + '</p>';


  }

  var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					maxZoom: 18,
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				}),
				center = L.latLng(36.0108858,-80.0160262),
      	map = L.map('map', {center: center, zoom: 10, layers: [tiles]});

  var southWest = L.latLng(35.850665,-80.346094),
      northEast = L.latLng(36.186469,-79.653),
      bounds = L.latLngBounds(southWest, northEast);

  $.getJSON('/api/v1/tweets', function(data){

    var tweets = data.tweets;

    for(var i = 0, x = tweets.length; i < x; i++){
      if(tweets[i].geo && tweets[i].geo.coordinates){
        var latlng = L.latLng(tweets[i].geo.coordinates),
            inBounds = bounds.contains(latlng);

        if(inBounds){
          var marker = L.marker(latlng);
            marker.data = tweets[i];
            marker.on('click', markerClick);
            marker.addTo(map);
        };
      }
    }

  });

  io.socket.on("tweet", function(event){

    if(event.data.geo && event.data.geo.coordinates){
      var latlng = L.latLng(event.data.geo.coordinates),
          inBounds = bounds.contains(latlng);

      if(inBounds){
        var marker = L.marker(latlng);
          marker.data = event.data;
          marker.on('click', markerClick);
          marker.addTo(map);
      };

    };





  });
  io.socket.get("/tweet");

  L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);


})(jQuery);
