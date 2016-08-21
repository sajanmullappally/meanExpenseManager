var app = angular.module('expenseManager');

app.controller('SignupController', ['$document', '$scope', '$http', '$timeout', 'Accounts', '$location', function($document, $scope, $http, $timeout, Accounts, $location){
    $scope.userSignup = function() {
    	alert("Signup");
    }
}]);