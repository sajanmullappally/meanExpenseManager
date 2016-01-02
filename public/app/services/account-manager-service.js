var app = angular.module('expenseManager');

app.service('Accounts', ['$http', function($http){
	this.getAccounts = function () {
		return $http.get('/api/accounts');
	};
}]);