import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import the BarController

// Register the necessary components, including BarController
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
); // Register the BarController along with other components

const Distribution = ({ arg }) => {
  const chartRef = useRef(null); // Reference for the chart canvas
  const [data, setData] = useState(null); // State to store fetched data

  console.log(arg.title);

  // Function to render the chart
  const renderChart = (data) => {
    // Extract labels (grade ranges) and values (counts)
    const labels = Object.keys(data.grades); // The keys will be the grade ranges (e.g., '50-54%', '55-59%', etc.)
    const values = Object.values(data.grades); // The values will be the corresponding counts

    // Check if the chartRef has been set
    if (chartRef.current) {
      new ChartJS(chartRef.current, {
        type: "bar",
        data: {
          labels: labels, // Array of grade ranges (labels)
          datasets: [
            {
              label: "Grade Distribution",
              data: values, // Array of student counts
              backgroundColor: "rgba(157, 75, 192, 0.2)",
              borderColor: "rgb(141, 75, 192)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  // Fetch grade data on component mount
  useEffect(() => {
    const sub = arg.title.split("_")[0];
    const num = arg.title.split(" ")[1];
    const num2 = num.split("-")[0];

    console.log(sub);
    console.log(num);
    console.log(num2);

    const fetchGradeData = async () => {
      const url = `https://ubcgrades.com/api/v3/grades/UBCV/2022W/${sub}/${num2}/OVERALL`; // Correct API endpoint
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fetchedData = await response.json();
        console.log("Fetched data:", fetchedData); // Log the entire response
        setData(fetchedData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching grade data:", error);
      }
    };

    fetchGradeData();
  }, []); // Empty dependency array to run only on mount

  // Render the chart once the data is fetched
  useEffect(() => {
    if (data) {
      renderChart(data); // Render the chart if data is available
    }
  }, [data]); // Dependency array to run when data is updated

  return (
    <div>
      <h2>Grade Distribution for {arg.title}</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default Distribution;
