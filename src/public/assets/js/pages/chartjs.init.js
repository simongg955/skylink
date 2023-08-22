function getChartColorsArray(r) {
  if (null !== document.getElementById(r)) {
    var o = document.getElementById(r).getAttribute("data-colors");
    return (o = JSON.parse(o)).map(function (r) {
      var o = r.replace(" ", "");
      if (-1 == o.indexOf("--")) return o;
      var a = getComputedStyle(document.documentElement).getPropertyValue(o);
      return a || void 0;
    });
  }
}
var islinechart = document.getElementById("lineChart");
(lineChartColor = getChartColorsArray("lineChart")),
  islinechart.setAttribute("width", islinechart.parentElement.offsetWidth);
var lineChart = new Chart(islinechart, {
    type: "line",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
      ],
      datasets: [
        {
          label: "Sales Analytics",
          fill: !0,
          lineTension: 0.5,
          backgroundColor: lineChartColor[0],
          borderColor: lineChartColor[1],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          pointBorderColor: lineChartColor[1],
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: lineChartColor[1],
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80],
        },
        {
          label: "Monthly Earnings",
          fill: !0,
          lineTension: 0.5,
          backgroundColor: lineChartColor[2],
          borderColor: lineChartColor[3],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: "miter",
          pointBorderColor: lineChartColor[3],
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: lineChartColor[3],
          pointHoverBorderColor: "#eef0f2",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36],
        },
      ],
    },
  }),
  isbarchart = document.getElementById("bar");
(barChartColor = getChartColorsArray("bar")),
  isbarchart.setAttribute("width", isbarchart.parentElement.offsetWidth);
var barChart = new Chart(isbarchart, {
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Sales Analytics",
          backgroundColor: barChartColor[0],
          borderColor: barChartColor[0],
          borderWidth: 1,
          hoverBackgroundColor: barChartColor[1],
          hoverBorderColor: barChartColor[1],
          data: [65, 59, 81, 45, 56, 80, 50, 20],
        },
      ],
    },
  }),
  ispiechart = document.getElementById("pieChart");
pieChartColors = getChartColorsArray("pieChart");
var pieChart = new Chart(ispiechart, {
    type: "pie",
    data: {
      labels: ["Desktops", "Tablets"],
      datasets: [
        {
          data: [300, 180],
          backgroundColor: pieChartColors,
          hoverBackgroundColor: pieChartColors,
          hoverBorderColor: "#fff",
        },
      ],
    },
  }),
  isdoughnutchart = document.getElementById("doughnut");
doughnutChartColors = getChartColorsArray("doughnut");
var lineChart = new Chart(isdoughnutchart, {
    type: "doughnut",
    data: {
      labels: ["Desktops", "Tablets"],
      datasets: [
        {
          data: [300, 210],
          backgroundColor: doughnutChartColors,
          hoverBackgroundColor: doughnutChartColors,
          hoverBorderColor: "#fff",
        },
      ],
    },
  }),
  ispolarAreachart = document.getElementById("polarArea");
polarAreaChartColors = getChartColorsArray("polarArea");
var lineChart = new Chart(ispolarAreachart, {
    type: "polarArea",
    data: {
      labels: ["Series 1", "Series 2", "Series 3", "Series 4"],
      datasets: [
        {
          data: [11, 16, 7, 18],
          backgroundColor: polarAreaChartColors,
          label: "My dataset",
          hoverBorderColor: "#fff",
        },
      ],
    },
  }),
  isradarchart = document.getElementById("radar");
radarChartColors = getChartColorsArray("radar");
lineChart = new Chart(isradarchart, {
  type: "radar",
  data: {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "Desktops",
        backgroundColor: radarChartColors[0],
        borderColor: radarChartColors[1],
        pointBackgroundColor: radarChartColors[1],
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: radarChartColors[1],
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: "Tablets",
        backgroundColor: radarChartColors[2],
        borderColor: radarChartColors[3],
        pointBackgroundColor: radarChartColors[3],
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: radarChartColors[3],
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  },
});
