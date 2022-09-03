import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "./Typography";
import logo from "../Images/logo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo2 from "../Images/logo2.png";

function Beginning() {
  const m1 = useMediaQuery("(min-width:600px)");

  return (
    <Container
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 9,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={m1 ? logo : logo2}
          alt="Logo notes"
          style={{
            width: m1 ? "300px" : "100px",
            height: "auto",
            marginTop: "10px",
          }}
        />
        <span
          style={{
            marginLeft: "20px",
            fontSize: "50px",
            marginTop: m1 ? "10px" : "20px",
            fontWeight: 900,
          }}
        >
          Blogs
        </span>
      </div>
      {m1 ? (
        <Typography
          variant="subtitle1"
          sx={{
            my: 3,
            fontFamily: "inherit",
            fontWeight: m1 ? 500 : 700,
            marginTop: m1 ? "-8px" : "-3px",
          }}
        >
          {m1
            ? "# Start where you are, Use what you have, Do what you can"
            : "#Start Use Do"}
        </Typography>
      ) : null}
    </Container>
  );
}

export default Beginning;
