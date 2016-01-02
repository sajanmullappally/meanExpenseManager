var app = angular.module('expenseManager');

app.controller('AccountManagerController', ['$scope', '$http', '$timeout', 'Accounts', function($scope, $http, $timeout, Accounts){
	
	$scope.accounts = [];
	$scope.account = {};

	function refresh() {

		Accounts.getAccounts().success(function(response) {
			$scope.accounts = response;
			$scope.account = '';
		});

	};

	refresh();

	$scope.addAccount = function() {
		$http.post('/api/new-account', $scope.account).success(function (response) {
			refresh();
			$scope.AccountForm.$setPristine(true);
		});
	};

	$scope.update = false;

	$scope.editAccount = function (id) {
		$http.get('/api/accounts/' + id).success(function (response) {
			$scope.account = response;
		});

		$timeout(function () {
			$scope.$apply(function () {
				$scope.update = true;
			});
		}, 0);

	};

	$scope.updateAccount = function () {
		$http.put('/api/accounts/' + $scope.account._id, $scope.account).success(function (response) {
			refresh();
			$scope.AccountForm.$setPristine(true);
		});

		$timeout(function () {
			$scope.$apply(function () {
				$scope.update = false;
			});
		}, 0);
	};

	$scope.deleteAccount = function (id) {
		$http.delete('/api/accounts/' + id).success(function (response) {
			refresh();
		});
	};



}]);

// Filter to calculate sum of account balance
app.filter('sumByKey', function() {
	return function(data, key) {
		if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
			return 0;
		}
		var sum = 0;
		for (var i = data.length - 1; i >= 0; i--) {
			sum += parseInt(data[i][key]);
		}
		return sum;
	};
});