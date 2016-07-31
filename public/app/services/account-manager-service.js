var app = angular.module('expenseManager');

app.service('Accounts', ['$http', function($http){
	this.getAccounts = function () {
		return $http.get('/api/accounts');
	};
}]);

app.service('Expenses', ['$http', function($http){
	this.getExpenses = function () {
		return $http.get('/api/expenses');
	};
}]);