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

  // vm.myurl = 'http://v.youku.com/v_show/id_XMjY3Mjc0NjMyMA==';
  ($.isEmptyObject(myService.get()))? (vm.myurl = 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html'):(vm.myurl = myService.get())
  // vm.myurl = myService.get() || 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html';
  vm.playlst = [
    {href: 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html', text: '1', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY3NDYyMTUwMA==.html', text: '2', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY3NzU2MTA2MA==.html', text: '3', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY3Nzc1NTY5Ng==.html', text: '4', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY3OTk4NzM2NA==.html', text: '5', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4MjA5MDIxMg==.html', text: '6', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4Mzg5ODI5Mg==.html', text: '7', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4NDAyMDQ1Mg==.html', text: '8', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4NTYyMjIyMA==.html', text: '9', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4NTc0NDQwOA==.html', text: '10', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4NzQxODYwMA==.html', text: '11', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4NzU0NDI1Mg==.html', text: '12', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4OTQ5ODI4MA==.html', text: '13', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY4OTcyOTUwOA==.html', text: '14', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY5MTc1MjQ0MA==.html', text: '15', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY5MTkwOTU2OA==.html', text: '16', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY5MzkwOTQwOA==.html', text: '17', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY5NTgzMTE0NA==.html', text: '18', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY5NzgxOTgwMA==.html', text: '19', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjY5Nzk0NTk5Mg==.html', text: '20', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwMDAzNzk5Mg==.html', text: '21', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwMDE4MjMwOA==.html', text: '22', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwMjI3ODc1Ng==.html', text: '23', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwMjQxMzYwNA==.html', text: '24', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNDQyNDUwOA==.html', text: '25', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNDU0NjAwMA==.html', text: '26', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjQ1MjQ4OA==.html', text: '27', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjcwODY1Mg==.html', text: '28', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjg2MDg3Mg==.html', text: '29', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjg2MDg5Mg==.html', text: '30', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjg2MDk3Mg==.html', text: '31', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjU3NzQwOA==.html', text: '32', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjg2MDgwOA==.html', text: '33', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjg2MDc4OA==.html', text: '34', title: null},
    {href: 'http://v.youku.com/v_show/id_XMjcwNjg2MDc4MA==.html', text: '35', title: null}];
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
  vm.success = true;
  vm.state = null;
  vm.API = null;
  vm.currentVideo = 0;
  vm.onPlayerReady = function (API) {
    vm.API = API;
    // $log.log('api', vm.API);
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

      vm.urls = response.data.urls;
      $log.log('response data url', vm.urls);
      vm.videoinfos = response.data.infos;
      $log.log('respanse data infos', vm.videoinfos);

      vm.videos = [];
      $.map(vm.urls, (o) => {
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
      $log.log('here', inLst(vm.myurl, vm.playlst));
      vm.inlst = inLst(vm.myurl, vm.playlst);
      vm.loadcomplete = true;
    }, () => {
      $log.log('post failure.');
      vm.success = false;
    });
  };
  ($.isEmptyObject(myService.get())) || vm.search();

  vm.select = function (i) {
    $log.log(i);
    // vm.myurl = 'http:' + i;
    vm.search();
  };
}
