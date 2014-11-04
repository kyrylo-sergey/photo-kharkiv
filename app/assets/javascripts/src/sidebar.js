/*global define, require, Event*/
/*jslint browser: true*/
define(['leaflet', './upload_form', 'leafletSidebar'], function(L, UploadForm) {
  var map, sidebar;

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
    var editBtn = document.querySelector('#sidebar #upload-button');
    editBtn.onclick = toggleEditMode.bind(this);
  }

  return {
    options: {
      collapsed: true
    },

    init: function(leafletMap) {
      map = leafletMap;
      sidebar = L.control.sidebar('sidebar');
      bindEvents.apply(this);
      UploadForm.init();
      sidebar.addTo(map);
      return this;
    },

    updateFormFields: function(latlng) {
      UploadForm.setLatitude(latlng.lat);
      UploadForm.setLongitude(latlng.lng);
    }
  };
});
