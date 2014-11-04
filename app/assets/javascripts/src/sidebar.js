/*global define, require, Event*/
/*jslint browser: true*/
define(['leaflet', './upload_form', 'leafletSidebar'], function(L, UploadForm) {
  var map;

  var sidebar = L.control.sidebar('sidebar'),
      editBtn = document.querySelector('#sidebar #upload-button'),
      uploadForm = UploadForm.init();

  function toggleEditMode() {
    var mapCont = map.getContainer();

    if (this.options.collapsed) {
      mapCont.dispatchEvent(new Event('start-edit-mode'));
    } else {
      mapCont.dispatchEvent(new Event('stop-edit-mode'));
    }
    this.options.collapsed = !this.options.collapsed;
  }

  function bindEvents() {
    editBtn.onclick = toggleEditMode.bind(this);
  }

  return {
    options: {
      collapsed: true
    },

    init: function() {
      bindEvents.apply(this);
      return this;
    },

    addTo: function(leafletMap) {
      map = leafletMap;
      sidebar.addTo(map);
    },

    updateFormFields: function(latlng) {
      uploadForm.setLatitude(latlng.lat);
      uploadForm.setLongitude(latlng.lng);
    }
  };
});
