/*global define*/
define(['./map'], function(Map) {
  return {
    init: function() {
      Map.init({lat: 50.0139, lng: 36.2253, zoomLvl: 14});
    }
  };
});
