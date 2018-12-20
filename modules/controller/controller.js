const app = angular
  .module("pseudoApp", ["angularUtils.directives.dirPagination"])
  .controller("pseudoCtrl", pseudoCtrl);
function pseudoCtrl($scope, $http, $log) {
  $http
    .get("http://localhost:8080/api/users")
    .then(function(response) {
      $scope.persons = response.data;
      $log.info(response);
    })
    .catch(function(error) {
      $scope.error = error;
      console.log(error);
      $log.info(error);
    });

  $scope.sort = function(keyname) {
    $scope.sortBy = keyname;
    $scope.sortReverse = !$scope.sortReverse;
  };
}
