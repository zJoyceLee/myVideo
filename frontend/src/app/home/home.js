angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: Controller,
    controllerAs: 'page'
  });

Controller.$inject = ['$log', '$http', 'myService'];

function Controller($log, $http, myService) {
  const vm = this;

  $http({
    method: 'GET',
    url: 'http://127.0.0.1:5000/videoLst'
  }).then((response) => {
    $log.log('get success');
    $log.log(response.data);

    vm.lst = response.data.videos;
  }, () => {
    $log.log('get failure.');
  });

  vm.goto = function (i) {
    $log.log('button click...');
    if (_.isEmpty(myService.get())) {
      myService.set({'url': i, 'playlist': []});
    } else {
      let global = myService.get();
      global.url = i;
      myService.set(global);
    }
  };
}
