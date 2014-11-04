/*global define*/
/*jslint browser: true*/
define(['./photo'], function(Photo) {
  var markers = JSON.parse(document.querySelector('#markers').dataset.markers);

  return {
    init: function(map) {
      markers.forEach(function(markerOpts) {
        Photo.init({
          map: map,
          coords: {
            lat: markerOpts.latitude,
            lng: markerOpts.longitude,
            url: markerOpts.image.url
          }});
      });
    }
  };
});
