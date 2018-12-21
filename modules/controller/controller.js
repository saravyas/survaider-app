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

  function chart(groupByColumn) {
    $http
      .get(`http://localhost:8080/api/users/chart/${groupByColumn}`)
      .then(function(response) {
        if (groupByColumn === "sex") {
          $scope.sex = response.data;
          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end

          // Create chart instance
          var chart = am4core.create("sexdiv", am4charts.XYChart);

          // Add data
          chart.data = $scope.sex;

          // Create axes

          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "_id";
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.minGridDistance = 30;

          categoryAxis.renderer.labels.template.adapter.add("dy", function(
            dy,
            target,
          ) {
            if (target.dataItem && target.dataItem.index & (2 == 2)) {
              return dy + 25;
            }
            return dy;
          });

          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

          // Create series
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = "count";
          series.dataFields.categoryX = "_id";
          series.name = "Count";
          series.columns.template.tooltipText =
            "{categoryX}: [bold]{valueY}[/]";
          series.columns.template.fillOpacity = 0.8;

          var columnTemplate = series.columns.template;
          columnTemplate.strokeWidth = 2;
          columnTemplate.strokeOpacity = 1;
        } else if (groupByColumn === "relationship") {
          $scope.relationship = response.data;

          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end

          // Create chart instance
          var chart = am4core.create("relationshipdiv", am4charts.PieChart);

          // Add data
          chart.data = $scope.relationship;

          // Add and configure Series
          var pieSeries = chart.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = "count";
          pieSeries.dataFields.category = "_id";
          pieSeries.slices.template.stroke = am4core.color("#fff");
          pieSeries.slices.template.strokeWidth = 2;
          pieSeries.slices.template.strokeOpacity = 1;

          // This creates initial animation
          pieSeries.hiddenState.properties.opacity = 1;
          pieSeries.hiddenState.properties.endAngle = -90;
          pieSeries.hiddenState.properties.startAngle = -90;
        }
        $log.info(response);
      })
      .catch(function(error) {
        $scope.error = error;
        console.log(error);
        $log.info(error);
      });
  }
  chart("sex");
  chart("relationship");

  $scope.sort = function(keyname) {
    $scope.sortBy = keyname;
    $scope.sortReverse = !$scope.sortReverse;
  };
}
