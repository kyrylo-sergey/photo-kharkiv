/*global require*/
/*jslint browser: true*/
require(['domReady'], function (domReady) {
  domReady(function() {
    require(['./src/app'], function(App) {
      App.init();
    });
  });
});
