import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import logo from "../Images/logo.png";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";
import "./tick.css";
import { supabase } from "../../Supabase";

export default function CreateUI(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const m1 = useMediaQuery("(min-width:600px)");

  const [heading, setHeading] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [body, setBody] = React.useState("");
  const [errorAlert, setErrorAlert] = React.useState("");
  const [posted, setPosted] = React.useState(false);
  const [wait, setWait] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    props.editStatusHandler();
  };

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    setHeading(props.data.title);
    setTagline(props.data.tagline);
    setBody(props.data.body);
  }, []);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const postTheNote = async () => {
    if (heading.length == 0 || tagline.length == 0 || body.length == 0) {
      setMessage(m1 ? "All the fields must be filled" : "Fill all the fields");
      setErrorAlert(true);
      return;
    }

    setWait(true);
    const { data, error } = await supabase
      .from("notes")
      .update({
        title: heading,
        tagline: tagline,
        body: body,
        isPinned: props.data.isPinned,
        time_edited: Date.now(),
      })
      .match({
        id: props.data.id,
      });

    if (data) {
      console.log("Data");
      console.log(data);
      setPosted(true);
      setWait(false);
    }

    if (error) {
      setMessage(error.message);
      setErrorAlert(true);
      console.log(error.message);
      setWait(false);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ minWidth: "350px" }}
      >
        <DialogTitle id="scroll-dialog-title">
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img
              alt="Logo maga"
              src={logo}
              style={{ width: "180px", height: "auto" }}
            />
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {!posted ? (
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {errorAlert ? (
                <Alert
                  onClose={() => {
                    setErrorAlert(false);
                  }}
                  severity="error"
                >
                  {message}
                </Alert>
              ) : null}

              <TextField
                id="standard-basic"
                label="Heading"
                variant="standard"
                placeholder="A Note On Automation"
                style={{ minWidth: "100%", marginTop: "10px" }}
                value={heading}
                onChange={(e) => {
                  setHeading(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                id="standard-basic"
                label="Tagline"
                variant="standard"
                placeholder="AutomationTesting"
                style={{ minWidth: "100%" }}
                value={tagline}
                onChange={(e) => {
                  setTagline(e.target.value);
                }}
              />

              <TextField
                id="outlined-multiline-static"
                label="Body"
                multiline
                rows={4}
                style={{ minWidth: "100%", marginTop: "40px" }}
                placeholder="Test automation is the practice of automatically reviewing and validating a software product"
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              />
            </DialogContentText>
          ) : (
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div style={{ minWidth: "100%" }}>
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
                <h2
                  style={{
                    minWidth: m1 ? "500px" : "100%",
                    color: "black",
                    fontFamily: "inherit",
                    marginTop: "25px",
                    textAlign: "center",
                  }}
                >
                  Successfully Edited
                </h2>
              </div>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "black" }}>
            {"Close"}
          </Button>
          <Button
            onClick={
              wait
                ? null
                : posted
                ? () => {
                    setPosted(false);
                    setWait(false);
                  }
                : postTheNote
            }
            style={{ backgroundColor: "black", color: "white" }}
          >
            {wait ? "Wait..." : posted ? "Edit Again" : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
