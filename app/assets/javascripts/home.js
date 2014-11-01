/*jslint browser: true*/ /*global  $,L*/
$(function(){
  var map, sidebar;

  if ($('#map').length) {
    map = L.map('map');
    map.setView([50.0139, 36.2253], 14);
    L.tileLayer('http://tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'All rights reserved',
      maxZoom: 18,
      subdomains: ''
    }).addTo(map);

    $(window).resize(map.invalidateSize);

    sidebar = L.control.sidebar('sidebar').addTo(map);

    $('#markers').data().markers.forEach(function(marker) {
      var photoThumb = L.icon({
        iconUrl: marker.image.url,
        iconSize: [40, 40]
      });

      L.marker([marker.latitude, marker.longitude], {icon: photoThumb})
        .addTo(map)
        .bindPopup('<img src="' + marker.image.url + '"/>');
    });
  }
});
