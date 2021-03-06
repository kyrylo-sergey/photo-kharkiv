/*jslint browser: true*/ /*global  $,L*/
$(function(){
  var map, sidebar, edit_mode_marker;

  function isEditMode() {
    return !$('#sidebar').hasClass('collapsed')
      && $('#sidebar').find('#profile').hasClass('active');
  }

  function tryEnableUpload() {
    if (edit_mode_marker && $('#photo_image').val() !== '') {
      $('#upload-photo').prop('disabled', false);
    } else {
      $('#upload-photo').prop('disabled', true);
    }
  }

  map = L.map('map');
  map.setView([50.0139, 36.2253], 14);
  L.tileLayer('http://tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'All rights reserved',
    maxZoom: 18,
    subdomains: ''
  }).addTo(map);

  $(window).resize(map.invalidateSize);

  sidebar = L.control.sidebar('sidebar').addTo(map);

  map.on('click', function(e){
    if(isEditMode()) {
      if(!edit_mode_marker){
	edit_mode_marker = L.marker(e.latlng).addTo(map);
      }
      $('#photo_latitude').val(e.latlng.lat);
      $('#photo_longitude').val(e.latlng.lng);

      tryEnableUpload();
    }
  });

  $('#markers').data().markers.forEach(function(marker) {
    var photoThumb = L.icon({
      iconUrl: marker.image.url,
      iconSize: [40, 40]
    });

    L.marker([marker.latitude, marker.longitude], {icon: photoThumb})
      .addTo(map)
      .bindPopup('<img src="' + marker.image.url + '"/>');
  });

  $("#photo_image").change(tryEnableUpload);

  $('#upload-dialog').click(function() {
    if (!isEditMode() && edit_mode_marker) {
      map.removeLayer(edit_mode_marker);
      edit_mode_marker = null;
    }
  });
});
