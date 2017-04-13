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
  ]);
})();
