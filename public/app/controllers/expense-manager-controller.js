var app = angular.module('expenseManager');

app.controller('ExpenseManagerController', ['$document', '$scope', '$http', '$timeout', '$location', 'Accounts', 'Expenses', function($document, $scope, $http, $timeout, $location, Accounts, Expenses){

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

        Expenses.getExpenses().success(function(response) {
            $scope.expenses = response;
            $scope.expense = '';
            console.log($scope.expenses);
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
                $scope.expense = '';
                refresh();
                $timeout(function () {
                    $scope.$apply(function () {
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

    $scope.deleteExpense = function(id, acc_id, exp_type, exp_old_bal, exp_new_bal) {
        console.log(id+"-"+acc_id+"-"+exp_type+"-"+exp_old_bal+"-"+exp_new_bal);
        $http.delete('/api/expenses/' + id).success(function (response) {
            refresh();
        });
    };

}]);