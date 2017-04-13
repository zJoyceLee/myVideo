'use strict';

angular.module('app.online', [
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.buffering'
])
.component('online', {
  templateUrl: 'app/online/online.html',
  controller: Controller,
  controllerAs: 'page'
});

Controller.$inject = ['$sce', '$timeout', '$http', '$log'];
function Controller($sce, $timeout, $http, $log) {
  const vm = this;
  vm.myurl = 'http://v.youku.com/v_show/id_XMjY3Mjc0NjMyMA==';
  vm.myurl = 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html';
  vm.searched = false;
  vm.success = true;
  vm.state = null;
  vm.API = null;
  vm.currentVideo = 0;
  vm.onPlayerReady = function (API) {
    vm.API = API;
    $log.log('api', vm.API);
  };
  vm.onCompleteVideo = function () {
    vm.isCompleted = true;
    vm.currentVideo++;
    if (vm.currentVideo >= vm.videos.length) {
      vm.currentVideo = 0;
    }
    vm.setVideo(vm.currentVideo);
  };
  vm.setVideo = function (index) {
    vm.API.stop();
    vm.currentVideo = index;
    vm.config.sources = vm.videos[index].sources;
    $timeout(vm.API.play.bind(vm.API), 100);
  };
  vm.search = function () {
    vm.searched = true;
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/search',
      data: {
        url: vm.myurl
      }
    }).then((response) => {
      $log.log('post success');

      vm.success = true;

      const urls = response.data;
      $log.log('response data', urls);

      vm.videoinfos = [
        {key: 'site', value: '优酷 (Youku)'},
        {key: 'title', value: '热血尖兵 24'}
      ];

      vm.videos = [];
      $.map(urls, (o) => {
        const videopiece = {
          sources: [{
            src: $sce.trustAsResourceUrl(o),
            type: 'video/mp4'
          }]
        };
        // $log.log(videopiece);
        vm.videos.push(videopiece);
      });
      $log.log('videos, vm.videos', vm.videos);
      vm.config = {
        preload: 'none',
        autoPlay: false,
        sources: vm.videos[0].sources,
        theme: 'bower_components/videogular-themes-default/videogular.css',
        plugins: {
          controls: {
            autoHide: true,
            autoHideTime: 5000
          }
        }
      };
    }, () => {
      $log.log('post failure.');
      vm.success = false;
    });
  };
}
