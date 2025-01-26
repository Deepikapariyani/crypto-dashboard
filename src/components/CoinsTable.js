import React from "react";
import { useState, useEffect } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

import axios from "axios";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  LinearProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  text: {
    primary: "white",
  },
});

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinsTable = () => {
  const classes = useStyles(); // Correctly use the hook

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  console.log(coins);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search?.toLowerCase() || "") ||
        coin.symbol.toLowerCase().includes(search?.toLowerCase() || "")
    );
    console.log(filtered); // Log filtered results
    return filtered;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          Crypto Prices By Market Cap
        </Typography>
        <TextField
          label="Search For Currency ... "
          varient="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row?.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: "20px 0", // Add padding for spacing
            width: "100%", // Ensure it spans the full width
            display: "flex", // Use flexbox for alignment
            justifyContent: "center", // Center the pagination
            overflow: "hidden", // Prevent overflow
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
