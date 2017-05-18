'use strict';

angular.module('app.stats', ['chart.js'])
  .component('stats', {
    templateUrl: 'app/stats/stats.html',
    controller: Controller,
    controllerAs: 'page'
  });

Controller.$inject = ['$log', '$http', 'myService', '$location'];
function Controller($log, $http, myService, $location) {
  const vm = this;
  vm.logged = false;
  const global = myService.get();
  if (global.hasOwnProperty('user')) {
    if (!_.isEmpty(global.user)) {
      vm.user = global.user;
      $log.log(vm.user);
      vm.logged = true;
    } else {
      $location.path('/login');
    }
  } else {
    $location.path('/login');
  }

  // $http({
  //   method: 'GET',
  //   url: 'http://127.0.0.1:5000/stats'
  // }).then((response) => {
  //   $log.log(response.data);
  // }, () => {

  // });

  vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
  vm.data = [300, 480, 100, 40, 120];
  vm.type = 'polarArea';

  vm.toggle = function () {
    vm.type = vm.type === 'polarArea' ?
      'pie' : 'polarArea';
  };
}
