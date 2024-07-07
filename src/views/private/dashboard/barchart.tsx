import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
const barChartDataDailyTraffic = [
  {
    name: "Daily Traffic",
    data: [20, 30, 40, 20, 45, 50, 30],
  },
];

const barChartOptionsDailyTraffic: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {},
    theme: "dark",
  },
  xaxis: {
    categories: ["00", "04", "08", "12", "14", "16", "18"],
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            // color: "#4318FF",
            opacity: 1,
            color: "",
          },
          {
            offset: 100,
            // color: "rgba(67, 24, 255, 1)",
            opacity: 0.4,
            color: "",
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "40px",
    },
  },
};

const BarChart = () => {
  return (
    <div className="flex flex-col justify-between w-full gap-4 h-full ">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col">
          <h6 className="text-md text-primary/50">Daily traffic</h6>
          <div className="flex justify-start items-end  gap-2">
            <h1 className="font-bold text-3xl ">2.77</h1>
            <h6 className="text-primary/50">Visitors</h6>
          </div>
        </div>
        <h6 className="text-secondary font-bold">+2.5%</h6>
      </div>
      <Chart
        options={barChartOptionsDailyTraffic}
        series={barChartDataDailyTraffic}
        type="bar"
        width="100%"
        height="80%"
      />
    </div>
  );
};

export default BarChart;
