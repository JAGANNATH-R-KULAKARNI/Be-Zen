import React from "react";
import Grid from "@mui/material/Grid";
import styles from "./Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useMediaQuery from "@mui/material/useMediaQuery";
import jagannath from "./Images/jagannath.jpeg";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const m1 = useMediaQuery("(min-width:430px)");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingLeft: m1 ? "10%" : "0%",
        paddingRight: "10%",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={m1 ? 4 : 12}
          style={{
            display: "flex",
            justifyContent: m1 ? "center" : "left",
            paddingLeft: m1 ? "0%" : "12%",
          }}
        >
          <div>
            <h3 style={{ fontSize: m1 ? "20px" : "15px", color: "black" }}>
              About
            </h3>
            <p style={{ fontSize: m1 ? "15px" : "10px" }}>
              {
                "This is a NoteKeeper Application used to write a note and store the information. This has all the componenets mentioned in the assignment. This application is done within 8 hours. I have used React.js as my frontend framework and also used Supabase as my database. Hi My name is Jagannath R Kulakarni & I am a pasionate coder. Hope you liked the project. I am looking forward for the interview. Thank you"
              }
            </p>
          </div>
        </Grid>
        <Grid
          item
          xs={m1 ? 4 : 6}
          style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
        >
          <div>
            <ul
              style={{ listStyleType: "none", fontSize: m1 ? "15px" : "10px" }}
            >
              <h3
                style={{
                  fontSize: m1 ? "20px" : "15px",
                  color: "black",
                  textAlign: "center",
                }}
              >
                {" "}
                Me
              </h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={jagannath}
                  style={{
                    width: "100px",
                    height: "auto",
                    borderRadius: "30px",
                  }}
                />
              </div>
            </ul>
          </div>
        </Grid>

        <Grid
          item
          xs={m1 ? 4 : 6}
          style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
        >
          <div>
            <ul
              style={{ listStyleType: "none", fontSize: m1 ? "15px" : "10px" }}
            >
              <h3
                style={{
                  fontSize: m1 ? "20px" : "15px",
                  color: "black",
                }}
              >
                {" "}
                {"My Details"}
              </h3>
              <li className={styles.footer}>Jagannath R Kulakarni</li>
              <li className={styles.footer}>
                The National Institute Of Engineering
              </li>
              <li className={styles.footer}>Information Science Engineering</li>
              <li className={styles.footer}>3rd Year</li>
              <br />
              <div style={{ display: "flex", justifyContent: "left" }}>
                <li className={styles.footer}>
                  <a
                    href="https://github.com/JAGANNATH-R-KULAKARNI"
                    target="_blank"
                    style={{ color: "black" }}
                  >
                    <GitHubIcon style={{ fontSize: "40px" }} />
                  </a>
                </li>
                <div style={{ width: "10px" }}></div>
                <li className={styles.footer}>
                  <a
                    href="https://www.linkedin.com/in/jagannath-r-kulakarni-a465841a7/"
                    target="_blank"
                    style={{ color: "#0A66C2" }}
                  >
                    <LinkedInIcon style={{ fontSize: "40px" }} />
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex", paddingLeft: m1 ? "0%" : "12%" }}>
            <h4 className={styles.footer}>
              <a
                href=""
                passHref={true}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "lighter",
                  fontSize: m1 ? "15px" : "12px",
                }}
                rel="noreferrer"
              >
                Copyright© Jagannath R Kulakarni
              </a>
            </h4>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
