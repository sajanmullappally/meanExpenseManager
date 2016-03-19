var app = angular.module('expenseManager');

app.controller('AccountManagerController', ['$document', '$scope', '$http', '$timeout', 'Accounts', '$location', function($document, $scope, $http, $timeout, Accounts, $location){
    
    $scope.accounts = [];
    $scope.account = {};

    function refresh() {

        Accounts.getAccounts().success(function(response) {
            $scope.accounts = response;
            $scope.account = {};
        });

    };

    refresh();

    $scope.resetAccountForm = function () {
        $scope.account = {};
        angular.element($document[0].querySelector('input.ng-invalid')).focus();
    };

    $scope.update = false;
    $scope.AccountForm = false;

    $scope.showAccountForm = function() {
        $scope.AccountForm = true;
    };

    $scope.closeAccountForm = function() {
        $scope.AccountForm = false;
    };

    $scope.addAccount = function(isValid) {
        if (isValid) {
            $http.post('/api/new-account', $scope.account).success(function (response) {
                refresh();

                $timeout(function () {
                    $scope.$apply(function () {
                        $scope.AccountForm = false;
                    });
                }, 0);
            });
        } else {
            $timeout(function () {
                angular.element($document[0].querySelector('input.ng-invalid')).focus();
            }, 0);
            // angular.element('input.ng-invalid').first().focus();
        }
    };


    $scope.editAccount = function (id) {
        $http.get('/api/accounts/' + id).success(function (response) {
            $scope.account = response;
        });

        $timeout(function () {
            $scope.$apply(function () {
                $scope.update = true;
                $scope.AccountForm = true;
            });
        }, 0);

    };

    $scope.updateAccount = function () {
        $http.put('/api/accounts/' + $scope.account._id, $scope.account).success(function (response) {
            refresh();
        });

        $timeout(function () {
            $scope.$apply(function () {
                $scope.update = false;
                $scope.AccountForm = false;
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