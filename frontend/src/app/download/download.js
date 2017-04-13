'use strict';

angular.module('app')
.component('download', {
  templateUrl: 'app/download/download.html',
  controller: Controller,
  controllerAs: 'page'
});

function Controller() {
  const vm = this;
  vm.msg = 'Hello, Download';
}
