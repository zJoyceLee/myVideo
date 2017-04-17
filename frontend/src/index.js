(function () {
  'use strict';
  angular
  .module('app', [
    'ui.router',
    'ngSanitize',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.buffering',
    // 'com.2fdevs.videogular.plugins.poster'

    'app.online',
    'app.test'
  ])
  .factory('myService', function () {
    let savedData = {};
    function set(data) {
      savedData = data;
    }
    function get() {
      return savedData;
    }
    return {
      set: set,
      get: get
    };
  });
})();
