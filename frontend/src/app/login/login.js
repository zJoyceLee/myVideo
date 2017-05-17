'use strict';

angular.module('app')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: Controller,
    controllerAs: 'page'
  });

function encrypt(str) {
  const hash = md5.create();
  hash.update(str);
  return hash.hex();
}

Controller.$inject = ['$log', '$http', '$window'];
function Controller($log, $http, $window) {
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
    vm.wrongpasswd = false;
    $log.log(vm.username, vm.passwd);
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:5000/login',
      data: {
        username: vm.username,
        passwd: encrypt(vm.passwd)
      }
    }).then((response) => {
      $log.log(response);
      // $window.location.href = '/home';
      if (response.data.isExist === true) {
        if (response.data.identify === true) {
          $window.location.href = '/home';
        } else {
          $log.log(response.data);
          vm.wrongpasswd = true;
        }
      } else {
        vm.isRegister = true;
      }
    }, () => {

    });
  };
  vm.register = function () {
    $log.log(vm.gender, vm.age);
    // vm.isRegister = true;
    if (!_.isEmpty(vm.username) && !_.isEmpty(vm.passwd) && (vm.gender!==false) && !_.isEmpty(vm.age) && _.isEqual(vm.passwd, vm.confirmpasswd)) {
      $log.log(vm.username, vm.passwd, vm.confirmpasswd, vm.gender, vm.age);
      $http({
        method: 'POST',
        url: 'http://127.0.0.1:5000/register',
        data: {
          username: vm.username,
          passwd: encrypt(vm.passwd),
          gender: vm.gender,
          age: vm.age
        }
      }).then((response) => {
        $log.log(response);
      }, () => {

      });
    }
    $log.log('click register.');
  };
}
