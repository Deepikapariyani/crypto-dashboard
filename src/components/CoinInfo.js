import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const datkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  text: {
    primary: "white",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 10,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchsetHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchsetHistoricalData();
    setFlag(true);
  }, [currency, days]);

  const classes = useStyles();

  return (
    <ThemeProvider theme={datkTheme}>
      <div className={classes.container}>
        {!historicalData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    label: `Price (in ${symbol})`,
                    data: historicalData.map((coin) => coin[1]),
                    borderColor: "gold",
                    borderWidth: 1,
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 0.5,
                  },
                },
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    ticks: {},
                  },
                },
                pan: {
                  enabled: true,
                  mode: "y",
                },
                zoom: {
                  drag: {
                    enabled: true,
                  },
                  mode: "xy",
                  sensitivity: 0.5,
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
