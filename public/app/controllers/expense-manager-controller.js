var app = angular.module('expenseManager');

app.controller('ExpenseManagerController', ['$scope', '$http', '$timeout', 'Accounts', 'Expenses', function($scope, $http, $timeout, Accounts, Expenses){

	$scope.accounts = [];

	Accounts.getAccounts().success(function(response) {
		$scope.accounts = response;
		// $scope.expense.selectedAccount = $scope.accounts[0];
	});

	$scope.expenseTypes = [
		{"name": "Debit"},
		{"name": "Credit"}
	];

	$scope.addExpense = function () {
		$http.post('/api/new-expense', $scope.expense).success(function (response) {
			console.log(response);
			$scope.expense = '';
			refresh();
			// $scope.AccountForm.$setPristine(true);
		});
	};

	$scope.expenses = [];
	$scope.expense = {};

	function refresh() {

		Expenses.getExpenses().success(function(response) {
			$scope.expenses = response;
			$scope.expense = '';
			console.log($scope.expenses);
		});

	};

	refresh();

}]);