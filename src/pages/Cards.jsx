import React,{useEffect , useState} from "react";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

const getRandomRgb=()=> {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const Cards=({ currency, price })=> {
  const [change, setChange] = useState(null);
  const [color, setColor] = useState(getRandomRgb());

  const fetchChange = async () => {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/historical/close.json?currency=" +
          currency
      );
      const data = await response.json();
      const prices = Object.values(data.bpi);
      const currentPrice = parseFloat(price.replace(",", ""));
      const yesterdayPrice = parseFloat(prices[prices.length - 2]);
      const changePercentage =
        ((currentPrice - yesterdayPrice) / yesterdayPrice) * 100;
      setChange(changePercentage.toFixed(2));
    } catch (error) {
      console.error("Error fetching price change:", error);
    }
  }

  useEffect(() => {
    fetchChange();
    setColor(getRandomRgb());
  }, [currency, price]);

  return (
    <WidgetItem
    percent={change}
    value={price}
    heading={currency}
    color={color}
  />
  )
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div>
  </article>
);

export default Cards