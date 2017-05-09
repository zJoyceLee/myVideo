'use strict';

angular.module('app')
.component('loading', {
  templateUrl: 'app/loading/loading.html',
  controller: Controller,
  controllerAs: 'page'
});

Controller.$inject = ['$log'];

function Controller($log) {
  const vm = this;
}
