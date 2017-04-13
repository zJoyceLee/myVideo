'use strict';

angular.module('app')
.component('about', {
  templateUrl: 'app/about/about.html',
  controller: Controller,
  controllerAs: 'page'
});

function Controller() {
  const vm = this;
  vm.msg = 'Hello, About';
  vm.info = [
    // {
    //   key: 'Introduction',
    //   value: "xxxx",
    //   img: '',
    //   src: ''
    // },
    {
      key: 'Code',
      value: 'https://github.com/zJoyceLee',
      img: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png',
      src: 'https://github.com/zJoyceLee'
    },
    {
      key: 'Frontend',
      value: 'AngularJS',
      img: 'https://angular.io/resources/images/logos/angular/angular.svg',
      src: 'https://angular.io/docs/ts/latest/'
    },
    {
      key: 'Frontend Automation',
      value: 'Gulp',
      img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1492100820&di=8ef7b9a12183fd4727fa2b150eba3ebd&src=http://static.oschina.net/uploads/img/201408/15172128_PKgT.png',
      src: 'http://gulpjs.com/'
    },
    {
      key: 'Backend',
      value: 'Flask',
      img: 'http://flask.pocoo.org/static/logo/flask.png',
      src: 'http://flask.pocoo.org/'
    },
    {
      key: 'Database',
      value: 'MongoDB',
      img: 'https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg',
      src: 'https://docs.mongodb.com/'
    }
  ];
  vm.introduction = 'This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.This project is created for watching video online, and save media sources convient.';
}
