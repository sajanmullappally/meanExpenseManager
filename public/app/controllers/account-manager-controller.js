var app = angular.module('expenseManager');

app.controller('AccountManagerController', ['$document', '$scope', '$http', '$timeout', 'Accounts', '$location', '$mdDialog', '$mdToast', function($document, $scope, $http, $timeout, Accounts, $location, $mdDialog, $mdToast){
    
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
    };

    $scope.update = false;
    $scope.showAddAccount = false;

    $scope.showAccountForm = function() {
        $scope.account = {};
        $scope.update = false;
        $scope.showAddAccount = true;
    };

    $scope.hideAccountForm = function () {
        $scope.showAddAccount = false;
    };


    $scope.addAccount = function(isValid) {
        if (isValid) {
            $http.post('/api/new-account', $scope.account).success(function (response) {
                refresh();
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Account Added Successfully')
                    .position('right bottom')
                    .hideDelay(3000)
                );

                $timeout(function () {
                    $scope.$apply(function () {
                        $location.url('/AccountManager/');
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
                $scope.showAddAccount = true;
                $scope.update = true;
            });
        }, 0);

    };

    $scope.updateAccount = function () {
        $http.put('/api/accounts/' + $scope.account._id, $scope.account).success(function (response) {
            refresh();
            $mdToast.show(
                $mdToast.simple()
                .textContent('Account Updated Successfully')
                .position('right bottom')
                .hideDelay(3000)
            );
        });

        $timeout(function () {
            $scope.$apply(function () {
                $scope.showAddAccount = false;
                $scope.update = false;
            });
        }, 0);
    };


    $scope.confirmDelete = function(id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
        .title('Confirm Account Deletion')
        .textContent('Are you sure you want to delete your account')
        .ariaLabel('Delete Account')
        .targetEvent(id)
        .ok('Delete')
        .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            $http.delete('/api/accounts/' + id).success(function (response) {
                refresh();
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('Account Deleted Successfully')
                    .position('right bottom')
                    .hideDelay(3000)
                );
            });
        }, function() {
            $scope.status = 'Account Deletion Cancelled';
        });
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