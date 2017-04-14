angular
  .module('app')
  .component('home', {
    templateUrl: 'app/home/home.html',
    controller: Controller,
    controllerAs: 'page'
  });

function Controller($log) {
  const vm = this;
  vm.msg = 'Hello, Home.';
  vm.homelst = [
    {title: '[晓说]高晓松深挖2017奥斯卡 感慨颁奖小年佳作少', href: 'http://v.youku.com/v_show/id_XMjcwMTU3OTQyOA==.html'},
    {title: '人民的名义 TV版', href: 'http://v.youku.com/v_show/id_XMjcwNjcwODY1Mg==.html'},
    {title: '鲜肉老师', href: 'http://v.youku.com/v_show/id_XMjY2NjM5MjE3Ng==.html'},
    {title: '三生三世十里桃花', href: 'http://v.youku.com/v_show/id_XMjQ4MTc0ODMyOA==.html'}
  ];
  vm.homesearch = function (i) {
    $log.log('search', i);
  };
  vm.homedownload = function (i) {
    $log.log('download', i);
  };
}
