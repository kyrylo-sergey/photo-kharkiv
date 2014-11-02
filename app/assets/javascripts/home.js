/*jslint browser: true*/ /*global  $,L*/
$(function() {
  'use strict';

  function Map(args) {
    this.map = L.map('map');
    this.isEditMode = false;

    this.map.setView([args.longitude, args.latitude], args.zoomLvl);
    L.tileLayer('http://tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);
    $(window).resize(this.map.invalidateSize);
  }

  Map.prototype.moveMarker = function(event) {
    this.editMarker.setLatLng(event.latlng).update().addTo(this.map);
  };

  Map.prototype.startEditing = function() {
    this.isEditMode = true;
    this.editMarker = L.marker();
  };

  Map.prototype.stopEditing = function() {
    this.isEditMode = false;
    this.map.removeLayer(this.editMarker);
  };

  Map.prototype.click = function(func) {
    this.map.on('click', func);
  };

  Map.prototype.unbind = function(evtType) {
    this.map.off(evtType);
  };

  Map.prototype.displayMarker = function(marker) {
    marker.addTo(this.map);
    return marker;
  };

  function UploadForm(el) {
    this.$el = $(el);
    this.$uploadField = this.$el.find('#photo_image');
    this.$latitudeField = this.$el.find('#photo_latitude');
    this.$longitudeField = this.$el.find('#photo_longitude');
    this.$submit = this.$el.find('#upload-photo');
    this.fields = [this.$latitudeField, this.$longitudeField, this.$uploadField];

    this.fields.forEach(function(field) {
      field.change(this.updateSubmit.bind(this));
    }, this);
  }

  UploadForm.prototype.setFields = function(args) {
    this.$latitudeField.val(args.latitude);
    this.$latitudeField.change();

    this.$longitudeField.val(args.longitude);
    this.$longitudeField.change();
  };

  UploadForm.prototype.updateSubmit = function() {
    var allFieldsFilled = this.fields.every(function(field) {
      return field.val() !== '';
    });

    if (allFieldsFilled) {
      this.$submit.prop('disabled', false);
    } else {
      this.$submit.prop('disabled', true);
    }
  };

  function Sidebar(args) {
    this.map = args.mapObj;
    this.isCollapsed = true;
    this.uploadForm = new UploadForm('#sidebar #upload');
    this.sidebar = L.control.sidebar('sidebar');
    this.$uploadButton = $('#sidebar #upload-button');

    this.$uploadButton.click(this.toggleCollapsed.bind(this));
    this.$uploadButton.click(this.toggleMapMode.bind(this));
  }

  Sidebar.prototype.display = function() {
    this.sidebar.addTo(this.map);
  };

  Sidebar.prototype.toggleCollapsed = function() {
    if (this.isCollapsed === true) {
      this.isCollapsed = false;
      this.map.click(this.sendMoveMarker.bind(this));
    } else if (this.isCollapsed === false) {
      this.isCollapsed = true;
      this.map.unbind('click');
    } else {
      throw new Error("Sidebar's state (isCollapsed) isn't Boolean");
    }
  };

  Sidebar.prototype.toggleMapMode = function() {
    if (this.map.isEditMode) {
      this.map.stopEditing();
    } else {
      this.map.startEditing();
    }
  };

  Sidebar.prototype.sendMoveMarker = function(event) {
    this.uploadForm.setFields({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    });
    this.map.moveMarker(event);
  };

  function Photo(args) {
    this.url = args.image.url;
    this.latitude = args.latitude;
    this.longitude = args.longitude;
    this.thumbnail = L.icon({
      iconUrl: this.url,
      iconSize: [40, 40]
    });
  }

  Photo.prototype.showOnMap = function(map) {
    var marker = map.displayMarker(
      L.marker(
        [this.latitude, this.longitude],
        {icon: this.thumbnail}
      )
    );
    marker.bindPopup('<img src="' + this.url + '"/>');
  };

  (function() {
    var map = new Map({
      longitude: 50.0139,
      latitude: 36.2253,
      zoomLvl: 14
    });

    var sidebar = new Sidebar({mapObj: map});
    sidebar.display();

    $('#markers').data().markers.forEach(function(markerArgs) {
      new Photo(markerArgs).showOnMap(map);
    });
  }());
});
