import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
// import { CryptoState } from "../CryptoContext";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "../store/slices/cryptoSlice";

const useStyles = makeStyles(() => ({
  title: {
    flex: "1",
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles(); // Correctly use the hook
  const navigate = useNavigate();
  // const { currency, setCurrency } = CryptoState();
  const currency = useSelector((state) => state.crypto.currency);
  // const symbol = useSelector((state) => state.crypto.symbol);
  const dispatch = useDispatch();
  console.log(currency);
  return (
    <div>
      <AppBar color="transpaent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              Crypto Navigator
            </Typography>
            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => dispatch(setCurrency(e.target.value))}
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
