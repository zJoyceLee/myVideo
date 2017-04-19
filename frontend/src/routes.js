angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    })
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
    .state('test', {
      url: '/test',
      component: 'test'
    })
    .state('about', {
      url: '/about',
      component: 'about'
    });
}
