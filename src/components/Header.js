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
import { CryptoState } from "../CryptoContext";

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
  const { currency, setCurrency } = CryptoState();
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
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
