'use strict';

angular.module('app')
.component('online', {
  templateUrl: 'app/online/online.html',
  controller: Controller,
  controllerAs: 'page'
});

Controller.$inject = ['$sce', '$timeout', '$http', '$log'];
function Controller($sce, $timeout, $http, $log) {
  const vm = this;
  vm.myurl = 'http://v.youku.com/v_show/id_XMjY3Mjc0NjMyMA==';
  vm.searched = false;
  vm.search = function () {
    vm.searched = true;
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/search',
      data: {
        url: vm.myurl
      }
    }).then((response) => {
      $log.log('post success, response', response.data);
    }, () => {
      $log.log('post failure.');
    });

    $http({
      method: 'GET',
      url: 'http://localhost:5000/test'
    }).then((response) => {
      vm.success = true;

      const urls = response.data.url_lst;

      vm.videoinfos = [
        {key: 'site', value: '优酷 (Youku)'},
        {key: 'title', value: '热血尖兵 24'}
      ];

      vm.state = null;
      vm.API = null;
      vm.currentVideo = 0;
      vm.onPlayerReady = function (API) {
        vm.API = API;
      };
      vm.onCompleteVideo = function () {
        vm.isCompleted = true;
        vm.currentVideo++;
        if (vm.currentVideo >= vm.videos.length) {
          vm.currentVideo = 0;
        }
        vm.setVideo(vm.currentVideo);
      };

      vm.videos = [];
      $.map(urls, (o) => {
        $log.log(o);
        const videopiece = {
          sources: [{
            src: $sce.trustAsResourceUrl(o),
            type: 'video/mp4'
          }]
        };
        vm.videos.push(videopiece);
      });

      vm.config = {
        preload: 'none',
        autoPlay: false,
        sources: vm.videos[0].sources,
        theme: 'bower_components/videogular-themes-default/videogular.css',
        plugins: {
          // poster: "http://www.videogular.com/assets/images/videogular.png",
          controls: {
            autoHide: true,
            autoHideTime: 5000
          }
        }
      };
      vm.setVideo = function (index) {
        vm.API.stop();
        vm.currentVideo = index;
        vm.config.sources = vm.videos[index].sources;
        $timeout(vm.API.play.bind(vm.API), 100);
      };
    }, () => {
      $log.log('get method fail');
    });
  };
}
