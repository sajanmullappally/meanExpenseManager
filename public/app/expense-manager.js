var app = angular.module('expenseManager', ['ngRoute', 'ngMessages', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput', 'ui.bootstrap']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/Dashboard', {
		templateUrl : 'app/views/dashboard.html',
		controller  : 'DashboardController'
	})
	.when('/', {
		templateUrl : 'app/views/login.html',
		controller  : 'LoginController'
	})
	.when('/Login', {
		templateUrl : 'app/views/login.html',
		controller  : 'LoginController'
	})
	.when('/Signup', {
		templateUrl : 'app/views/signup.html',
		controller  : 'SignupController'
	})
	.when('/AccountManager', {
		templateUrl : 'app/views/account-manager.html',
		controller  : 'AccountManagerController'
	})
	.when('/ExpenseManager', {
		templateUrl : 'app/views/expense-manager.html',
		controller  : 'ExpenseManagerController'
	});
});

// Active Menu State in Bootstrap Sidebar
app.controller('SidebarController', ['$scope', '$location', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);