var app = angular.module('expenseManager');

app.controller('AccountManagerController', ['$scope', '$http', function($scope, $http){
	function refresh() {
		$http.get('/api/accounts').success(function (response) {
			$scope.accounts = response;
			$scope.account = "";
		});
	};

	refresh();

	$scope.addAccount = function() {
		$http.post('/api/new-account', $scope.account).success(function (response) {
			refresh();
			$scope.AccountForm.$setPristine(true);
		});
	};

	$scope.editAccount = function (id) {
		console.log(id);
		$http.get('/api/accounts/' + id).success(function (response) {
			$scope.account = response;
			console.log(response)
		});
	};

	$scope.deleteAccount = function (id) {
		$http.delete('/api/accounts/delete/' + id).success(function (response) {
			refresh()
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