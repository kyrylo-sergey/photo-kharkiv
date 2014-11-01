/*jslint browser: true*/ /*global  $,L*/
$(function(){

  var map, sidebar, edit_mode_marker;

  function is_edit_mode(){
    return !$('#sidebar').hasClass('collapsed')
      && $('#sidebar').find('#profile').hasClass('active');
  }

  if ($('#map').length) {
    map = L.map('map');
    map.setView([50.0139, 36.2253], 14);
    L.tileLayer('http://tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'All rights reserved',
      maxZoom: 18,
      subdomains: ''
    }).addTo(map);

    $(window).resize(map.invalidateSize);

    if ($('#sidebar').length) {
      sidebar = L.control.sidebar('sidebar').addTo(map);
    }

    map.on('click', function(e){
      if(is_edit_mode()) {
	if(edit_mode_marker) {
	  edit_mode_marker.setLatLng(e.latlng)
	} else {
	  edit_mode_marker = L.marker(e.latlng);
	  edit_mode_marker.addTo(map)
	}
	$('#photo_latitude').val(e.latlng.lat);
	$('#photo_longitude').val(e.latlng.lng);
      }
    });
  }

  $('#markers').data().markers.forEach(function(marker) {
    var photoThumb = L.icon({
      iconUrl: marker.image.url,
      iconSize: [40, 40]
    });

    L.marker([marker.latitude, marker.longitude], {icon: photoThumb})
      .addTo(map)
      .bindPopup('<img src="' + marker.image.url + '"/>');
  });
});
