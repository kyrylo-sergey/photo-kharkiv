/*global define*/
/*jslint browser: true*/
define(['leaflet'], function(L) {
  return {
    options: {
      size: [40, 40]
    },

    init: function(args) {
      var thumb = L.icon({
        iconUrl: args.coords.url,
        iconSize: this.options.size
      });

      var marker = L.marker([args.coords.lat, args.coords.lng], {icon: thumb});

      marker.addTo(args.map);
      marker.bindPopup('<img src="' + args.coords.url + '"/>');
    }
  };
});
