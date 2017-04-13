angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    })
    .state('online', {
      url: '/online',
      component: 'online'
    })
    .state('download', {
      url: '/download',
      component: 'download'
    })
    .state('about', {
      url: '/about',
      component: 'about'
    });
}
