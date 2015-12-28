var app = angular.module('expenseManager', ['ngRoute', 'jcs-autoValidate']);

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

app.run(['bootstrap3ElementModifier', function (bootstrap3ElementModifier) {
	bootstrap3ElementModifier.enableValidationStateIcons(true);
}]);

// Active Menu State in Bootstrap Sidebar
app.controller('SidebarController', ['$scope', '$location', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);