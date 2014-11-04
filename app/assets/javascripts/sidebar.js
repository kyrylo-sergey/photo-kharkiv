/*global require*/
/*jslint browser: true*/
require(['domReady'], function (domReady) {
  domReady(function() {
    require(['./src/sidebar', './src/map'], function(Sidebar, Map) {
      Sidebar.init(Map.instance);
    });
  });
});
