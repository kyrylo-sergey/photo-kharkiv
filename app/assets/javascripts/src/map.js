/*global define*/
/*jslint browser: true*/
define([
  'leaflet',
  './sidebar',
  './photo_collection'
], function(L, Sidebar, PhotoCollection) {
  var map = L.map('map'),
      sidebar = Sidebar.init(),
      layerStyle = 'http://tile.osm.org/{z}/{x}/{y}.png';

  function startEditing() {
    var that = this;

    this.options.editing = true;
    this.editMarker = L.marker();

    var moveMarker = function(event) {
      if (!that.options.editing) {
        return;
      }

      that.editMarker.setLatLng(event.latlng).update().addTo(map);
      sidebar.updateFormFields(event.latlng);
    };

    map.on('click', moveMarker);
  }

  function stopEditing() {
    this.options.editing = false;
    map.removeLayer(this.editMarker);
    delete this.editMarker;
    map.off('click');
  }

  function bindEvents() {
    var mapContainer = map.getContainer();

    window.onresize = map.invalidateSize;

    mapContainer.addEventListener('start-edit-mode', startEditing.bind(this));
    mapContainer.addEventListener('stop-edit-mode', stopEditing.bind(this));
  }

  return {
    options: {
      editing: false
    },

    init: function(args) {
      sidebar.addTo(map);

      map.setView([args.lat, args.lng], args.zoomLvl);
      L.tileLayer(layerStyle, {maxZoom: 18}).addTo(map);

      PhotoCollection.init(map);

      bindEvents.apply(this);
    }
  };
});
