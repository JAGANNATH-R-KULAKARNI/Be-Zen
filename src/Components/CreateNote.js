import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "./Utilities/Typography";
import TextField from "./Utilities/TextField";
import Snackbar from "./Utilities/Snackbar";
import Button from "./Utilities/Button";
import logo from "./Images/logo2.png";
import todo from "./Images/plan.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateUI from "./Create/Create";

function CreateNote() {
  const m1 = useMediaQuery("(min-width:600px)");
  const [createStatus, setCreateStatus] = React.useState(false);

  return (
    <Container component="section" sx={{ mt: 10, display: "flex" }}>
      {createStatus ? (
        <div>
          <CreateUI
            createStatusHandler={() => setCreateStatus(!createStatus)}
          />
        </div>
      ) : null}
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
              px: 3,
              backgroundColor: "#F4BD00",
              fontFamily: "inherit",
              borderRadius: m1 ? "100px" : "40px",
            }}
          >
            <Box component="form" sx={{ maxWidth: 400 }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logo}
                  alt="Logo bro"
                  style={{ width: "120px", height: "auto" }}
                />
              </div>
              <h1
                style={{
                  fontSize: m1 ? "60px" : "40px",
                  fontWeight: 900,
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                Create A Note
              </h1>

              <h2
                style={{
                  fontSize: m1 ? "20px" : "15px",
                  marginTop: m1 ? "-50px" : "-30px",
                  fontWeight: 100,
                }}
              >
                #When your heart speaks, take good notes
              </h2>

              <br />
              <Button
                color="primary"
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "black",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  setCreateStatus(!createStatus);
                }}
              >
                CREATE
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
            }}
          />
          <Box
            component="img"
            src={todo}
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
              borderRadius: "40px",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateNote;
