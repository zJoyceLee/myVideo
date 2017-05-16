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
    global = {url: 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html', playlist: []};
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
    // if (myobj.hasOwnProperty(item))
    if (_.has(myobj, item)) {
      return true;
    }
    return false;
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
      vm.cached = angular.fromJson(response.data.record);
      $log.log(vm.cached);

      vm.infos = angular.fromJson(response.data.infos);
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
  vm.download = function (item, ext) {
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
        ext: ext,
        addr: vm.cached[item].addr,
        name: vm.cached[item].name
      }
    }).then((response) => {
      $log.log('download post success...');
      // $log.log(response.data);
      $log.log(response);
      $log.log(response.headers);

      let contentType = '';
      $log.log(ext);
      if (ext === 'mp4') {
        contentType = 'video/mp4';
      } else if (ext === 'flv') {
        contentType = 'video/x-flv';
      }
      $log.log('type', contentType);
      download(response.data, vm.cached[item].name, contentType);
    }, () => {
      $log.log('download post failure...');
    });
  };
}

function download(data, filename, type) {
  const file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) { // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else { // Others
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
