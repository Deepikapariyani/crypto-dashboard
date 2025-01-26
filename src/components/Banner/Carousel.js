import React from "react";
import { makeStyles } from "@mui/styles";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { X } from "@mui/icons-material";

const useStyles = makeStyles(() => ({
  Carousel: {
    height: "50%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    overflowX: "hidden",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const [responsive, setResponsive] = useState({});

  // Function to calculate number of items dynamically
  const calculateResponsive = () => {
    const width = window.innerWidth;

    if (width < 512) {
      setResponsive({ 0: { items: 2 } }); // For very small screens
    } else if (width < 1024) {
      setResponsive({ 0: { items: 3 } }); // For medium screens
    } else {
      setResponsive({ 0: { items: 4 } }); // For larger screens
    }
  };

  useEffect(() => {
    calculateResponsive(); // Initial calculation on mount

    // Recalculate on window resize
    window.addEventListener("resize", calculateResponsive);

    return () => {
      window.removeEventListener("resize", calculateResponsive); // Cleanup
    };
  }, []);
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  console.log(items);
  return (
    <div className={classes.Carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        disableButtonsControls
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
