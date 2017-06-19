// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
 $stateProvider
	 .state('index',{
	 url: '/index',
	 templateUrl: 'templates/menu.html',
		 //controller: 'AppCtrl'
 })
	 .state('login',{
	 url: '/login',
	 templateUrl: 'templates/login.html',
	 controller: 'loginCtrl'
  })
   .state('insertadmin',{
	 url: '/insertadmin',
	 templateUrl: 'templates/insert_admin.html',
	 controller: 'AdminCtrl'
  })
   .state('editadmin',{
	 url: '/editadmin',
	 templateUrl: 'templates/edit_admin.html',
	 controller: 'EditAdminCtrl'
	 })
		 .state('deladmin',{
	 url: '/deladmin',
	 templateUrl: 'templates/del_admin.html',
	 controller: 'DelAdminCtrl'
	 })
	 .state('history',{
	 url: '/history',
	 templateUrl: 'templates/history.html',
		//controller: 'AppCtrl'
	 })
		 
	 .state('text',{
	 url: '/text',
	 templateUrl: 'templates/text.html',
		//controller: 'AppCtrl'
	 })
		 .state('option',{
	 url: '/option',
	 templateUrl: 'templates/option.html',
		//controller: 'AppCtrl'
	 })
		 .state('gallory',{
	 url: '/gallory',
	 templateUrl: 'templates/gallory.html',
		controller: 'PlaylistCtrl1'
	 })
    .state('insertnews',{
	 url: '/insertnews',
	 templateUrl: 'templates/insert_news.html',
		controller: 'NewsCtrl'
	 })
    .state('seradmin',{
	 url: '/seradmin',
	 templateUrl: 'templates/serch_admin.html',
		controller: 'SerchAdminCtrl'
	 })
   
	$urlRouterProvider.otherwise('/login');
})
.controller('loginCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.loginData={};

 $scope.doLogin=function(){
      var admin_user=$scope.loginData.username;
      var admin_password=$scope.loginData.password;
      console.log(admin_user);
      if(admin_user && admin_password){
          str=url+"login.php?username="+admin_user+"&password="+admin_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;
                sessionStorage.setItem('loggedin_status',true);
                sessionStorage.setItem('loggedin_id',$scope.admin.admin_id);
                sessionStorage.setItem('loggedin_status',$scope.admin.admin_user);

                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })

                $ionicPopup.alert({
                  title:'ล็อกอิน',
                  template:'ยินดีต้อนรับเข้าสู่ระบบ'
                })

                $state.go('gallory',{},{location:"replace",reload:true});
            })
            .error(function(){

              $ionicPopup.alert({
                title:'ล็อกอิน',
                template:'ไม่สามารถล็อกอินได้ กรุณาตรวจสอบ'
              })
            });

      }else{
        $ionicPopup.alert({
          title:'ล็อกอิน',
          template:'กรุณากรอกข้อมูลให้ครบ'
        })

      }

  }
})
/*.controller('PlaylistCtrl',function($scope){
	$scope.datalist=[
	{fname:"Pretty Hate Matchin",lname:"Nine Inch Nails",pic:"img/1.jpg"},
	{fname:"Pretty Hate Matchin 1 ",lname:"Nine Inch Nails 1 ",pic:"img/2.jpg"},
	{fname:"Pretty Hate Matchin 2 ",lname:"Nine Inch Nails 2 ",pic:"img/3.jpg"},
	{fname:"Pretty Hate Matchin 3 ",lname:"Nine Inch Nails 3 ",pic:"img/4.jpg"}
	];
})*/
.controller('PlaylistCtrl1',function($scope,$http){

$scope.datalist=[];
$scope.url="http://localhost/ionic_php/Loaddata.php";
$http.get($scope.url)
	.success(function(data){
$scope.datalist=data;
})
	.error(function(data){
console.log("Errer");
	});
})
.controller('AdminCtrl',function($scope,$http){
  var url="http://localhost/ionic_php/";
$scope.AdminData=[];
$scope.ceatAdmin=function(){
  var admin_user=$scope.AdminData.username;
  var admin_password=$scope.AdminData.password;
  console.log(admin_user);
str=url+"admin-insert.php?username="+ admin_user+"&password="+admin_password;
$http.get(str)
.success(function(data){
  if(data == true){
    console.log("OK");
  }
})
.error(function(data){
  console.log("Error");
});
}
})
.controller('EditAdminCtrl',function($scope,$http){
  var url="http://localhost/ionic_php/";
$scope.EditAdminData=[];
$scope.editadmin=function(){
  var admin_id=$scope.EditAdminData.editadmin.id;
  var admin_user=$scope.EditAdminData.editadmin.username;
  var admin_password=$scope.EditAdminData.editadmin.password;
  console.log(admin_user);
str=url+"admin-edit.php?id="+admin_id+"&username="+ admin_user+"&password="+admin_password;
$http.get(str)
.success(function(data){
  if(data == true){
    console.log("OK");
  }
})
.error(function(data){
  console.log("Error");
});
}
})
.controller('NewsCtrl',function($scope,$http){
  var url="http://localhost/ionic_php/";
$scope.NewsData=[];
$scope.ceatData=function(){
  var news_f=$scope.NewsData.fnews;
  var news_l=$scope.NewsData.lnews;
  var news_pic=$scope.NewsData.picnews;
  console.log(news_f),console.log(news_l),console.log(news_pic);
str=url+"news-insert.php?fname="+news_f+"&lname="+news_l+"&pic"+news_pic;
$http.get(str)
.success(function(data){
  if(data == true){
    console.log("OK");
  }
})
.error(function(data){
  console.log("Error");
});
}
})
.controller('DelAdminCtrl',function($scope,$http){
  var url="http://localhost/ionic_php/";
$scope.DelAdminData=[];
$scope.deladmin=function(){
  var admin_id=$scope.DelAdminData.deladmin.id;
  console.log(admin_id);
str=url+"admin-del.php?id="+admin_id;
$http.get(str)
.success(function(data){
  if(data == true){
    console.log("OK");
  }
})
.error(function(data){
  console.log("Error");
});
}
})
.controller('SerchAdminCtrl',function($scope,$http){
  var url="http://localhost/ionic_php/";
$scope.SerAdminData=[];
$scope.seradmin=function(){
  var admin_id=$scope.SerAdminData.seradmin.id;
  console.log(admin_id);
str=url+"admin-showedit.php?id="+admin_id;
$http.get(str)
.success(function(data){
  if(data == true){
    console.log("OK");
  }
})
.error(function(data){
  console.log("Error");
});
}
})