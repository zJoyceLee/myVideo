angular
  .module('app.home', [])
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: Controller,
    controllerAs: 'page'
  });

Controller.$inject = ['$log', '$http', 'myService'];

function Controller($log, $http, myService) {
  const vm = this;
  const global = myService.get();
  $log.log(global);
  vm.loading = true;
  $http({
    method: 'GET',
    url: 'http://127.0.0.1:5000/videoLst'
  }).then((response) => {
    $log.log('get success');
    $log.log(response.data);

    vm.videos = response.data.videos;
    vm.categories = response.data.categories;
    vm.loading = false;
  }, () => {
    $log.log('get failure.');
    vm.loading = false;
  });

  vm.goto = function (i) {
    $log.log('button click...');
    if (_.isEmpty(global)) {
      global.url = i;
      global.serie = [];
      myService.set(global);
    } else {
      global.url = i;
      myService.set(global);
    }
  };
}
