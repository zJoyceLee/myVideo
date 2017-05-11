'use strict';

angular.module('app')
.component('download', {
  templateUrl: 'app/download/download.html',
  controller: Controller,
  controllerAs: 'page'
});

Controller.$inject = ['$log', '$http', 'myService'];

function Controller($log, $http, myService) {
  const vm = this;
  let global = {};
  if (_.isEmpty(myService.get())) {
    global = {'url': 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html', 'playlist': []};
  } else {
    global = myService.get();
  }
  vm.myurl = global.url;

  vm.searched = false;
  vm.loadcomplete = false;
  vm.success = false;

  vm.change = function () {
    vm.searched = false;
  };

  vm.inCached = function (item, myobj) {
    if (_.isEmpty(myobj)) {
      return false;
    }
    if (myobj.hasOwnProperty(item)) {
      return true;
    } else {
      return false;
    }
  };

  vm.search = function () {
    global.url = vm.myurl;
    myService.set(global);
    // reset
    vm.loadcomplete = false;
    vm.success = false;
    // reset end

    vm.searched = true;
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/infos',
      data: {
        url: vm.myurl
      }
    }).then((response) => {
      $log.log('post success');
      vm.cached = JSON.parse(response.data.record);
      $log.log(vm.cached);

      vm.infos = JSON.parse(response.data.infos);
      vm.streams = _.keysIn(vm.infos.streams);
      $log.log(vm.infos);
      vm.success = true;
      vm.loadcomplete = true;
    }, () => {
      $log.log('post failure.');
      vm.success = false;
      vm.loadcomplete = true;
    });
  };
  ($.isEmptyObject(myService.get())) || vm.search();
  vm.check = function () {
    $log.log(vm.infos);
  };

  vm.cache = function (item, ext) {
    vm.caching = true;
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/cache',
      data: {
        url: vm.myurl,
        format: item,
        name: vm.infos.title,
        ext: ext
      }
    }).then((response) => {
      $log.log('cache post success...');
      $log.log(response.data);
      vm.caching = false;
      vm.search();
    }, () => {
      $log.log('cache post failure...');
      vm.caching = false;
    });
  };
  vm.download = function (item) {
    $log.log(item);
    $log.log(vm.myurl);
    $log.log(vm.cached);
    $log.log(vm.cached[item]);

    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/download',
      data: {
        url: vm.myurl,
        format: item,
        addr: vm.cached[item]['addr'],
        name: vm.cached[item]['name']
      }
    }).then((response) => {
      let link = document.createElement("a");
      link.download = 'data';
      link.href = 'http://127.0.0.1:5000/download';
      link.click();

    }, () => {
      $log.log('download post failure...');
    });


    // $http({
    //   method: 'POST',
    //   url: 'http://127.0.0.1:5000/download',
    //   data: {
    //     url: vm.myurl,
    //     format: item
    //   }
    // }).then((response) => {
    //   // $log.log(response.data);
    //   let link = document.createElement("a");
    //   link.download = 'data';
    //   link.href = 'http://127.0.0.1:5000/download';
    //   link.click();

    // }, () => {
    //   $log.log('download post failure...');
    // });
  };
}
