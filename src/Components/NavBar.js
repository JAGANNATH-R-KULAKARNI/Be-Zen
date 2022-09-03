import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import logo from "./Images/logo.png";
import SeacrUI from "./Utilities/Search";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResponsiveAppBar = () => {
  const m1 = useMediaQuery("(min-width:600px)");

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        paddingTop: "10px",
        paddingBottom: m1 ? "15px" : "0px",
      }}
      elevation={1}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            alt="NoteKeeper"
            style={{
              width: m1 ? "300px" : "60%",
              height: "auto",
              marginLeft: m1 ? "10px" : "20%",
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: "100px",
              marginTop: "10px",
            }}
          >
            {/* <SeacrUI /> */}
          </Box>
          {m1 ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <IconButton onClick={null} sx={{ p: 0 }}>
                  <Avatar alt="Jagannath R Kulakarni" src="" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
      {!m1 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "80%",
            marginLeft: "10%",
            marginTop: "10px",
          }}
        >
          {/* <SeacrUI /> */}
        </div>
      ) : null}
    </AppBar>
  );
};
export default ResponsiveAppBar;
