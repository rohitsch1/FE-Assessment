import React, {useState , useEffect} from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { DoughnutChart } from "../../components/Charts";

const PieCharts = () => {
  const [pieChartData , setPieChartData] = useState({
    state :[],
    medianAge:[]
  })

  // Function for showing doughnut chart Of Top 5 Populated States in US And there median age. 
  const fetchData = async () => {
    try {
      const year = 2020; 
      const responseStateWisePopulation = await fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population&Year=${year}&sort=Population&limit=5`);
      const { data } = await responseStateWisePopulation.json();
      const topFiveCountriesForPopulation = data.map(countryData => countryData.State)
      const responseStateWiseMedianAge = await fetch(`https://datausa.io/api/data?drilldowns=State&measures=Median Age&year=${year}`);
      const medianAgeData = await responseStateWiseMedianAge.json();
      const value = []
      medianAgeData?.data?.forEach(element => {
        if(topFiveCountriesForPopulation.includes(element.State)){
          value.push(element)
        }
      });
      const pieChart = {
        state :[],
        medianAge:[]
      }
      value.forEach((ele)=>{
        pieChart.state.push(ele.State)
        pieChart.medianAge.push(ele['Median Age'])
      })
      setPieChartData(pieChart)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <DoughnutChart
              labels={pieChartData?.state}
              data={pieChartData?.medianAge}
              backgroundColor={[
                "hsl(335, 100%, 38%)",
                "hsl(200, 100%, 50%)",
                "hsl(280, 90%, 45%)",
                "hsl(150, 90%, 40%)",
                "hsl(30, 100%, 50%)"
              ]}
              offset={[10, 10]}
            />
          </div>
          <h2>Top 5 Populated States in US & there Median Age</h2>
          
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
