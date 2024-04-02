import React, {useEffect, useState} from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { LineChart } from "../../components/Charts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const BarCharts = () => {
  const [medianAge, setMedianAge] = useState({data: [], labels: []});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const year= 2021
        const response = await fetch(`https://datausa.io/api/data?drilldowns=State&measures=Median Age&year=${year}&sort=-Median Age&limit=10`);
        const { data } = await response.json();
        const medianAgeData = {
          data: [],
          labels: []
        };
        
        data?.forEach(element => {
          medianAgeData.data.push(element['Median Age']);
          medianAgeData.labels.push(element['State']);
        });
        
        setMedianAge(medianAgeData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            data={medianAge.data}
            label="Age"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
            labels={medianAge.labels}
          />
          <h2>Median Age by State</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
