import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Coins from "./components/Coins";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  text: {
    primary: "white",
  },
});

const useStyles = makeStyles(() => ({
  root: {
    background: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles(); // Correctly use the hook
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<Coins />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
