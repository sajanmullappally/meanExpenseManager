var app = angular.module('expenseManager');

app.controller('LoginController', ['$document', '$scope', '$http', '$timeout', 'Accounts', '$location', function($document, $scope, $http, $timeout, Accounts, $location){
    $scope.userLogin = function() {
    	alert("Login");
    }
}]);