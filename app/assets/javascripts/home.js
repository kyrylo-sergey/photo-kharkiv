/*jslint browser: true*/ /*global  $,L*/
$(function(){
  var map = L.map('map');
  map.setView([50.0139, 36.2253], 14);
  L.tileLayer('http://tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'All rights reserved',
    maxZoom: 18,
    subdomains: ''
  }).addTo(map);


  $(window).resize(map.invalidateSize);
});
