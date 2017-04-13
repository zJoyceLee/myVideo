'use strict';
angular.module('app.test',
  [
    'ngSanitize',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls'
  ]
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

// 'use strict';
// angular.module('app.test', [
//   'ngSanitize',
//   'com.2fdevs.videogular',
//   'com.2fdevs.videogular.plugins.controls',
//   'com.2fdevs.videogular.plugins.overlayplay',
//   // 'com.2fdevs.videogular.plugins.poster',
//   'com.2fdevs.videogular.plugins.buffering'
// ])
// .component('test', {
//   templateUrl: 'app/testvideo/test.html',
//   controller: Controller,
//   controllerAs: 'page'
// });

// Controller.$inject = ['$sce', '$timeout'];

// function Controller($sce, $timeout) {
//   var vm = this;
//   vm.state = null;
//   vm.API = null;
//   vm.currentVideo = 0;

//   vm.onPlayerReady = function (API) {
//     vm.API = API;
//   };

//   vm.onCompleteVideo = function () {
//     vm.isCompleted = true;

//     vm.currentVideo++;

//     if (vm.currentVideo >= vm.videos.length) {
//       vm.currentVideo = 0;
//     }

//     vm.setVideo(vm.currentVideo);
//   };

//   var urls = [
//     'http://static.videogular.com/assets/videos/videogular.mp4',
//     'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov'
//   ];
//   vm.videos = [];
//   $.map(urls, (o) => {
//     var videopiece =  {
//       sources: [
//         {src: $sce.trustAsResourceUrl(o), type: 'video/mp4'}
//       ]
//     };
//     vm.videos.push(videopiece);
//   });

//   vm.config = {
//     preload: 'none',
//     autoHide: false,
//     autoHideTime: 3000,
//     autoPlay: false,
//     sources: vm.videos[0].sources,
//     theme: {
//       url: 'http://www.videogular.com/styles/themes/default/latest/videogular.css'
//     },
//     plugins: {
//       poster: 'http://www.videogular.com/assets/images/videogular.png'
//     }
//   };

//   vm.setVideo = function (index) {
//     vm.API.stop();
//     vm.currentVideo = index;
//     vm.config.sources = vm.videos[index].sources;
//     $timeout(vm.API.play.bind(vm.API), 100);
//   };
// }
