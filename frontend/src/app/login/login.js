'use strict';

angular.module('app')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: Controller,
    controllerAs: 'page'
  });

Controller.$inject = ['$log', '$http'];
function Controller($log, $http) {
  const vm = this;
  vm.isRegister = false;
  vm.switch = function () {
    vm.isRegister = !vm.isRegister;
  };
  // vm.username;
  // vm.passwd;
  vm.gender = false;
  // vm.remember = false;
  vm.login = function () {
    // vm.isRegister = false;
    $log.log(vm.username, vm.passwd);
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/login',
      data: {
        username: vm.username,
        passwd: vm.passwd
      }
    }).then(() => {

    }, () => {

    });
  };
  vm.register = function () {
    $log.log(vm.gender, vm.age);
    // vm.isRegister = true;
    if (!_.isEmpty(vm.username) && !_.isEmpty(vm.passwd)  && (vm.gender!==false)  && !_.isEmpty(vm.age) && _.isEqual(vm.passwd, vm.confirmpasswd)) {
      $log.log(vm.username, vm.passwd, vm.confirmpasswd, vm.gender, vm.age);
      // $http({
      //   method: 'POST',
      //   url: 'http://127.0.0.1:5000/login',
      //   data: {
      //     username: vm.username,
      //     passwd: vm.passwd,
      //     gender: vm.gender,
      //     age: vm.age
      //   }
      // }).then(() => {

      // }, () => {

      // });
    }
    $log.log('click register.');
  };
}
