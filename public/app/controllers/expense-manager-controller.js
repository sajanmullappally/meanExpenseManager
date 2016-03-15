var app = angular.module('expenseManager');

app.controller('ExpenseManagerController', ['$scope', '$http', '$timeout', '$location', 'Accounts', 'Expenses', function($scope, $http, $timeout, $location, Accounts, Expenses){

	$scope.accounts = [];

	Accounts.getAccounts().success(function(response) {
		$scope.accounts = response;
	});

	$scope.expenseTypes = [
		{"name": "Debit"},
		{"name": "Credit"}
	];

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

	$scope.addExpense = function () {
		if ($scope.expense.selectedExpenseType.name==="Debit") {
			$scope.expense.new_balance = parseFloat($scope.expense.selectedAccount.balance) - parseFloat($scope.expense.amount);
		} else if ($scope.expense.selectedExpenseType.name==="Credit") {
			$scope.expense.new_balance = parseFloat($scope.expense.selectedAccount.balance) + parseFloat($scope.expense.amount);
		}
		$http.post('/api/new-expense', $scope.expense).success(function (response) {
			console.log(response);
			$scope.expense = '';
			refresh();
			$location.url('/ExpenseManager/');
			// $scope.AccountForm.$setPristine(true);
		});
	};

	$scope.deleteExpense = function(id) {
		$http.delete('/api/expenses/' + id).success(function (response) {
			refresh();
		});
	};

}]);