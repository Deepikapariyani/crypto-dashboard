import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", // Ensures the image covers the entire area
    backgroundPosition: "center", // Centers the image
    width: "100%", // Ensures full width
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bannerTagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

const Banner = () => {
  const classes = useStyles(); // Correctly use the hook

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.bannerTagline}>
          <Typography
            style={{
              fonntWeight: "bold",
            }}
            variant="h2"
          >
            Crypto Navigator
          </Typography>
          <Typography
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
            }}
            variant="subtitle2"
          >
            Get real time info of your crypto
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
