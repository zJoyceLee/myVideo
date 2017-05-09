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

  ($.isEmptyObject(myService.get()))? (vm.myurl = 'http://v.youku.com/v_show/id_XMjY3MTQ2MDE0OA==.html'):(vm.myurl = myService.get())

  vm.searched = false;
  vm.loadcomplete = false;
  vm.success = false;

  vm.change = function () {
    vm.searched = false;
  }

  vm.search = function () {
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

      vm.infos = JSON.parse(response.data.infos);
      vm.streams = _.keysIn(vm.infos.streams);
      $log.log(vm.infos);
      vm.success = true;

      // vm.urls = response.data.urls;
      // $log.log('response data url', vm.urls);
      // vm.videoinfos = response.data.infos;
      // $log.log('respanse data infos', vm.videoinfos);

      vm.loadcomplete = true;
    }, () => {
      $log.log('post failure.');
      vm.success = false;
      vm.loadcomplete = true;
    });
  };
  ($.isEmptyObject(myService.get())) || vm.search();
  vm.check = function() {
    $log.log(vm.infos);
  }
}
