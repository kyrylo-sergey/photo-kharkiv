/*global define*/
/*jslint browser: true*/
define(function() {
  var formElement = document.querySelector('#new_photo'),
      imgField = formElement.querySelector('#photo_image'),
      latField = formElement.querySelector('#photo_latitude'),
      lngField = formElement.querySelector('#photo_longitude'),
      submitBtn = formElement.querySelector('#upload-photo');

  function isFilled() {
    return latField.value !== '' && lngField.value !== '' &&
      imgField.value !== '';
  }

  function updateSubmit() {
    if (isFilled()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  function bindEvents() {
    imgField.onchange = updateSubmit;
  }

  return {
    init: function() {
      submitBtn.disabled = true;
      bindEvents();

      return this;
    },

    setLatitude: function(latitude) {
      latField.value = latitude;
      updateSubmit();
    },

    setLongitude: function(longitude) {
      lngField.value = longitude;
      updateSubmit();
    }
  };
});
