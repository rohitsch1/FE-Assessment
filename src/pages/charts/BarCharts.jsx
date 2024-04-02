import React, { useState , useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { BarChart } from "../../components/Charts";

const BarCharts = () => {
  const [populationData, setPopulationData] = useState([]);
  const [state , setState] = useState([]);

  const fetchDataForStateWisePopulation = async () => {
    try {
      const year = 2020; 
      const response = await fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population&Year=${year}&limit=20`);
      const { data } = await response.json();
      const populationData = []
      const StateData =[]
      data.forEach((data)=>{
        populationData.push(data.Population)
        StateData.push(data.State)
      })
      setState(StateData)
      setPopulationData(populationData)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataForStateWisePopulation();
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            horizontal={true}
            data_1={populationData}
            data_2={[]}
            title_1="Population"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={state}
          />
          <h2>USA StateWise population</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
