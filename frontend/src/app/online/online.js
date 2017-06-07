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

Controller.$inject = ['$sce', '$timeout', '$http', '$log', 'myService'];
function Controller($sce, $timeout, $http, $log, myService) {
  const vm = this;
  vm.getting = false;
  let global = {};
  if (_.isEmpty(myService.get()) || _.isEmpty(myService.get().url)) {
    global = {url: 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html', serie: []};
  } else {
    global = myService.get();
  }
  $log.log(global);
  vm.myurl = global.url;

  vm.getSerie = function () {
    vm.getting = true;
    $log.log('get serie click...');
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/serie',
      data: {
        url: global.url
      }
    }).then((response) => {
      $log.log('post success...get serie...');
      $log.log(response.data);
      vm.set_serie = true;
      vm.serie = response.data.serie;
      global.serie = vm.serie;
      myService.set(global);
      $log.log(global);
      if (_.isEmpty(vm.serie)) {
        vm.set_serie = false;
      }
      vm.complete = true;
    }, () => {
      $log.log('post failure...do not get serie...');
      vm.complete = true;
    });
  };

  function inLst(url, lst) {
    let ret = false;
    $.map(lst, (o) => {
      if (o.href === url) {
        ret = true;
      }
    });
    return ret;
  }

  vm.searched = false;
  vm.loadcomplete = false;
  vm.success = false;
  vm.haveMP4 = false;

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
  vm.setVideo = function (index) {
    vm.API.stop();
    vm.currentVideo = index;
    vm.config.sources = vm.videos[index].sources;
    $timeout(vm.API.play.bind(vm.API), 100);
  };
  vm.change = function () {
    vm.searched = false;
  };
  vm.search = function () {
    global.url = vm.myurl;
    myService.set(global);

    $log.log(inLst(global.url, global.serie));
    if (inLst(global.url, global.serie)) {
      vm.serie = global.serie;
    } else {
      vm.serie = [];
      vm.getSerie();
    }

    // reset
    vm.loadcomplete = false;
    vm.success = false;
    vm.haveMP4 = false;
    // reset end

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
      vm.mydata = response.data;
      $log.log(vm.mydata);
      vm.haveMP4 = vm.mydata.haveMP4;

      if (vm.haveMP4) {
        vm.urls = vm.mydata.urls;
        vm.videoinfos = vm.mydata.infos;

        vm.videos = [];
        $.map(vm.urls, (o) => {
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
          plugins: {
            controls: {
              autoHide: true,
              autoHideTime: 5000
            }
          }
        };
        vm.inlst = inLst(vm.myurl, vm.playlst);
      } // endif vm.haveMP4

      vm.loadcomplete = true;
    }, () => {
      $log.log('post failure.');
      vm.success = false;
      vm.loadcomplete = true;
    });
  };

  ($.isEmptyObject(myService.get())) || vm.search();

  vm.select = function (i) {
    $log.log(i);
    vm.myurl = i;
    vm.search();
  };
}
