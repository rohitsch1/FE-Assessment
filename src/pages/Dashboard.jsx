import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import userImg from "../assets/userpic.png";
import { LineChart } from "../components/Charts";
import Cards from "./Cards";
import ConnectWallet from "./ConnectWallet";

const dashboard = () => {
  const [bitcoinPrices, setBitcoinPrices] = useState(null);
  const [populationData, setPopulationData] = useState([]);
  const [year, setYear] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population&sort=Year"
      );
      const data = await response.json();
      const populationArray = data.data.map((item) => item.Population);
      const populationYear = data.data.map((item) => item.Year);
      setPopulationData(populationArray);
      setYear(populationYear);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBitcoinPrices = async () => {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await response.json();
      setBitcoinPrices(data.bpi);
    } catch (error) {
      console.error("Error fetching Bitcoin prices:", error);
    }
  };

  useEffect(()=>{
    fetchBitcoinPrices();
    fetchData();
  },[])


  useEffect(()=>{
    // Cheking at every change that metaMask is connected or not
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletConnected(true);
      } else {
        setWalletConnected(false);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.off('accountsChanged', handleAccountsChanged);
    };
    
  },[])

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <ConnectWallet {...{ walletConnected, setWalletConnected }} />
          <img src={userImg} alt="User" />
        </div>

        <h2>Bitcoin Prices</h2>
        <section className="widget-container">
          {bitcoinPrices &&
            Object.keys(bitcoinPrices).map((currency) => (
              <Cards
                key={currency}
                currency={currency}
                price={bitcoinPrices[currency].rate}
              />
            ))}
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>USA Population </h2>
            <LineChart
              data={populationData}
              backgroundColor={"hsla(29,80%,40%,0.4)"}
              borderColor={"hsl(29,80%,40%)"}
              label="Population"
              labels={year}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default dashboard;
