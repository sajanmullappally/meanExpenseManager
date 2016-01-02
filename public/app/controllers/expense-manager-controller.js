var app = angular.module('expenseManager');

app.controller('ExpenseManagerController', ['$scope', '$http', '$timeout', 'Accounts', function($scope, $http, $timeout, Accounts){

	$scope.accounts = [];
	$scope.selectedAccount = {};

	Accounts.getAccounts().success(function(response) {
		$scope.accounts = response;
		$scope.selectedAccount = $scope.accounts[0];
	});

}]);