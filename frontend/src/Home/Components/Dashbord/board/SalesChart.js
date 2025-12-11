import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { MyContext, useMyContext } from "../../../../ContextApi";
import "../../../home.css";

export default function SalesLineChart() {
  const { sales, fetchData } = useMyContext(MyContext);

  const months = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const [state, setState] = useState({
    series: [{
      name: "revenue €",
      data: []
    }],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: {
        text: "Sales Overview",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: { categories: months }
    }
  });


  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const salesData = months.map(m => sales[m] ?? 0);

    setState(prev => ({
      ...prev,
      series: [{ name: "revenue €", data: salesData }]
    }));
  }, [sales]);

  return (
    <div>
      <div id="chart flex ">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          className=" "
        />
      </div>
    </div>
  );
}
