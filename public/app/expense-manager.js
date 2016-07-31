var app = angular.module('expenseManager', ['ngRoute', 'ngMessages', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'app/views/dashboard.html',
			controller  : 'DashboardController'
		}).
		when('/AccountManager', {
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