/*global require*/
/*jslint browser: true*/
require(['domReady'], function (domReady) {
  domReady(function() {
    require(['./src/map'], function(Map) {
      Map.init({lat: 50.0139, lng: 36.2253, zoomLvl: 14});
    });
  });
});
