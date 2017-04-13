angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: Controller,
    controllerAs: 'page'
  });

function Controller() {
  const vm = this;
  vm.msg = 'Hello, Home.';
}
