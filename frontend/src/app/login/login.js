'use strict';

  angular.module('app.login', [])
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

Controller.$inject = ['$log', '$http', '$location', '$window', 'myService'];
function Controller($log, $http, $location, $window, myService) {
  const vm = this;

  const global = myService.get();
  console.log('global', global);
  console.log(global.hasOwnProperty('user'));
  if (global.hasOwnProperty('user')) {
    console.log('user', global.user);
    if (!_.isEmpty(global.user)) {
      vm.username = global.user.username;
      vm.gender = global.user.gender;
      vm.age = global.user.age;
      vm.alreadylogin = true;
    } else {
      vm.alreadylogin = false;
    }
  } else {
    vm.alreadylogin = false;
  }

  vm.isRegister = false;
  vm.switch = function () {
    vm.isRegister = !vm.isRegister;
  };
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
      if (response.data.isExist === true) {
        if (response.data.identify === true) {
          global.user = response.data.user;
          myService.set(global);
          $log.log('login success', global);
          vm.alreadylogin = true;
          // $window.location.href = '/home';
          $location.path('/stats');
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
    vm.existuser = false;
    vm.gender = false;
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
        $log.log(response.data);
        if (response.data.isExist === true) {
          vm.existuser = true;
        } else { // register success
          $log.log(response.data);
          vm.isRegister = false;
        }
      }, () => {

      });
    }

    $log.log('click register.');
  };

  vm.logout = function () {
    global.user = {};
    myService.set(global);
    vm.alreadylogin = false;
    $window.location.href = '/stats';
  };
}
