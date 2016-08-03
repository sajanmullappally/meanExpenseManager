var app = angular.module('expenseManager');

app.controller('ExpenseManagerController', ['$document', '$scope', '$http', '$timeout', '$location', '$uibModal', 'Accounts', 'Expenses', function($document, $scope, $http, $timeout, $location, $uibModal, Accounts, Expenses){

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

        Accounts.getAccounts().success(function(response) {
            $scope.accounts = response;
        });

        Expenses.getExpenses().success(function(response) {
            $scope.expenses = response;
            $scope.expense = '';
        });

    };

    refresh();

    $scope.expenseForm = false;

    $scope.showExpenseForm = function() {
        $scope.expenseForm = true;
    };

    $scope.closeExpenseForm = function() {
        $scope.expenseForm = false;
    };

    // $scope.expense.date = new Date();

    $scope.addExpense = function (isValid) {
        if (isValid) {
            if ($scope.expense.selectedExpenseType.name==="Debit") {
                $scope.expense.new_balance = parseFloat($scope.expense.selectedAccount.balance) - parseFloat($scope.expense.amount);
            } else if ($scope.expense.selectedExpenseType.name==="Credit") {
                $scope.expense.new_balance = parseFloat($scope.expense.selectedAccount.balance) + parseFloat($scope.expense.amount);
            }
            $http.post('/api/new-expense', $scope.expense).success(function (response) {
                console.log(response);
                $timeout(function () {
                    $scope.$apply(function () {
                        refresh();
                        $scope.expenseForm = false;
                    });
                }, 0);
                // $scope.AccountForm.$setPristine(true);
            });
        } else {
            $timeout(function () {
                angular.element($document[0].querySelector('input.ng-invalid')).focus();
            }, 0);
        }
    };

    // $scope.deleteExpense = function(id) {
    //     $http.delete('/api/expenses/' + id).success(function (response) {
    //         refresh();
    //     });
    // };

    $scope.deleteExpense = function(id, acc_id, exp_type, exp_balance, exp_amount) {
        if (exp_type==="Debit") {
            $scope.updated_balance = exp_balance + exp_amount;
        } else if (exp_type==="Credit") {
            $scope.updated_balance = exp_balance - exp_amount;
        }
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'accountUpdateModal.html',
            controller: 'accountUpdateModalController',
            resolve: {
                updated_balance: function () {
                    return $scope.updated_balance;
                }
            }
        });
        // $http.delete('/api/expenses/' + id + '/' + acc_id + '/' + $scope.updated_balance).success(function (response) {
        //     refresh();
        // });
    };

}]);

app.controller('accountUpdateModalController', function ($scope, $uibModalInstance, updated_balance) {

  $scope.updated_balance = updated_balance;

  $scope.ok = function () {
    console.log($scope.updated_balance);
  };

  $scope.cancel = function () {
    console.log($scope.updated_balance);
  };
});