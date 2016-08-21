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
            });
        } else {
            $timeout(function () {
                angular.element($document[0].querySelector('input.ng-invalid')).focus();
            }, 0);
        }
    };

    $scope.deleteExpense = function(expense) {
        if (expense.type==="Debit") {
            $scope.updated_balance = expense.account.balance + expense.amount;
        } else if (expense.type==="Credit") {
            $scope.updated_balance = expense.account.balance - expense.amount;
        }
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'accountUpdateModal.html',
            controller: 'accountUpdateModalController',
            resolve: {
                updated_balance: function () {
                    return $scope.updated_balance;
                },
                expense: function() {
                    return expense;
                }
            }
        });
    };

}]);

app.controller('accountUpdateModalController', function ($scope, $http, $uibModalInstance, updated_balance, expense, Accounts, Expenses) {

    $scope.account_balance = expense.account.balance;
    $scope.updated_balance = updated_balance;
    $scope.account_title = expense.account.name;

    function refresh() {
        Accounts.getAccounts().success(function(response) {
            $scope.accounts = response;
        });

        Expenses.getExpenses().success(function(response) {
            $scope.expenses = response;
            $scope.expense = '';
        });
    };

    $scope.ok = function () {
        $http.delete('/api/expenses/' + expense._id + '/' + expense.account._id + '/' + $scope.updated_balance).success(function (response) {
            refresh();
            $uibModalInstance.close($scope.updated_balance);
        });
    };

    $scope.cancel = function () {
        $http.delete('/api/expenses/' + expense._id).success(function (response) {
            refresh();
            $uibModalInstance.close($scope.updated_balance);
        });
    };
});