'use strict';

angular.module('app')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: Controller,
    controllerAs: 'page'
  });

Controller.$inject = ['$log'];
function Controller($log) {
  const vm = this;
  vm.isRegister = false;
  vm.switch = function () {
    vm.isRegister = !vm.isRegister;
  };
  // vm.username;
  // vm.passwd;
  vm.remember = false;
  vm.login = function () {
    // vm.isRegister = false;
    $log.log(vm.username, vm.passwd, vm.remember);
  };
  vm.register = function () {
    // vm.isRegister = true;
    if (!_.isEmpty(vm.username) && !_.isEmpty(vm.passwd) && _.isEqual(vm.passwd, vm.confirmpasswd)){
      $log.log(vm.username, vm.passwd, vm.confirmpasswd, vm.remember);
    }
    $log.log('click register.');
  };
}
