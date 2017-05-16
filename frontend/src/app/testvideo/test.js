'use strict';
angular.module('app.test', []
)
.component('test', {
  templateUrl: 'app/testvideo/test.html',
  controller: Controller,
  controllerAs: 'page'
});

Controller.$inject = ['$sce'];

function Controller($sce) {
  this.config = {
    preload: 'none',
    sources: [
      {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'},
      {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.webm'), type: 'video/webm'},
      {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.ogg'), type: 'video/ogg'}
    ],
    theme: {
      url: 'http://www.videogular.com/styles/themes/default/latest/videogular.css'
    },
    plugins: {
      controls: {
        autoHide: true,
        autoHideTime: 5000
      }
    }
  };
}

// if (flvjs.isSupported()) {
//   var videoElement = document.getElementById('videoElement');
//   var flvPlayer = flvjs.createPlayer({
//     type: 'flv',
//     url: '/home/joyce/Poker/test.flv'
//   });
//   flvPlayer.attachMediaElement(videoElement);
//   flvPlayer.load();
//   flvPlayer.play();
// }
