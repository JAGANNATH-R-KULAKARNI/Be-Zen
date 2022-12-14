import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import logo2 from "../Images/logo2.png";
import PushPinIcon from "@mui/icons-material/PushPin";
import EditUI from "../Edit/Edit";
import { supabase } from "../../Supabase";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CardForNote(props) {
  const m1 = useMediaQuery("(min-width:600px)");

  const [view, setView] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("success");
  const [msg, setMsg] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updatePin = async (val) => {
    const tt = props.data.title;

    const { data, error } = await supabase
      .from("notes")
      .update({
        isPinned: val,
        time_edited: Date.now(),
      })
      .match({
        id: props.data.id,
      });

    if (data) {
      setMsg("'" + tt + `' has been  ${val ? "Pinned" : "Unpinned"}`);
      setType("success");
      setOpen(true);
    }

    if (error) {
      setMsg("Something went wrong :(");
      setType("error");
      setOpen(true);
    }
  };
  const DeleteNote = async () => {
    const tt = props.data.title;

    const { data, error } = await supabase
      .from("notes")
      .delete()
      .match({ id: props.data.id });

    if (data) {
      setMsg("'" + tt + `' has been successfully deleted`);
      setType("success");
      setOpen(true);
    }

    if (error) {
      setMsg("Something went wrong :(");
      setType("error");
      setOpen(true);
    }
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      {edit ? (
        <EditUI editStatusHandler={() => setEdit(!edit)} data={props.data} />
      ) : null}
      <Paper style={{ width: "90%", borderRadius: "20px" }} elevation={5}>
        <div style={{ display: "flex", justifyContent: "left" }}>
          {props.data.isPinned ? (
            <PushPinIcon style={{ fontSize: "50px", marginTop: "5px" }} />
          ) : null}

          <p
            style={{
              color: "#949494",
              fontFamily: "monospace",
              marginLeft: props.data.isPinned ? "10px" : "40px",
            }}
          >
            Last Edited -{" "}
            <span
              style={{
                fontWeight: 900,
                fontSize: "15px",
                fontFamily: "monospace",
              }}
            >
              {props.data.time_edited ? props.data.time_edited : null} ago
            </span>
          </p>
        </div>
        <h1
          style={{
            textAlign: "left",
            width: "100%",
            fontSize: m1 ? "30px" : "17px",
            fontWeight: 600,
            paddingLeft: m1 ? "30px" : "10px",
            paddingRight: m1 ? "30px" : "10px",

            marginTop: "-7px",
          }}
        >
          {props.data.title} -{" "}
          <span style={{ fontWeight: 500 }}>{props.data.tagline}</span>
        </h1>
        <div
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            fontSize: "14px",
            paddingBottom: "10px",
          }}
        >
          <p style={{ color: "#949494", letterSpacing: "0.1em" }}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            {view ? props.data.body : props.data.body.substr(0, 255) + "..."}
          </p>
        </div>
        {!m1 ? (
          <Paper
            style={{
              borderTopLeftRadius: "40px",
              borderTopRightRadius: "40px",
            }}
            elevation={10}
          >
            <div
              style={{
                display: m1 ? "flex" : "block",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "45px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logo2}
                  alt="Logo 2 blog"
                  style={{
                    height: "35px",
                    width: "auto",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <FormGroup
                  style={{
                    width: "50%",
                    height: "50px",
                    marginTop: "-4px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ paddingLeft: "50px", color: "black" }}
                        onChange={(e) => {
                          updatePin(e.target.checked);
                        }}
                        checked={props.data.isPinned}
                      />
                    }
                    label={
                      <p style={{ fontFamily: "inherit", fontWeight: 700 }}>
                        {" "}
                        {props.data.isPinned ? "Unpin" : "Pin"}
                      </p>
                    }
                    style={{ fontFamily: "inherit" }}
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  style={{
                    width: "50%",
                    backgroundColor: view ? "white" : "black",
                    color: view ? "black" : "white",
                    border: "2px solid black",
                  }}
                  onClick={() => {
                    setView(!view);
                  }}
                >
                  {view ? "Close" : "View"}
                </Button>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  style={{
                    width: "50%",
                    height: "46px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onClick={() => setEdit(!edit)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  style={{
                    width: "50%",
                    height: "46px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  onClick={DeleteNote}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Paper>
        ) : (
          <Paper
            elevation={10}
            style={{
              width: "100%",
              borderTopLeftRadius: "40px",
              borderTopRightRadius: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormGroup
              style={{
                width: "25%",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ paddingLeft: "50px", color: "black" }}
                    onChange={(e) => {
                      updatePin(e.target.checked);
                    }}
                    checked={props.data.isPinned}
                  />
                }
                label={
                  <p style={{ fontFamily: "inherit", fontWeight: 700 }}> Pin</p>
                }
                style={{ fontFamily: "inherit" }}
              />
            </FormGroup>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              style={{
                width: "25%",
                backgroundColor: view ? "white" : "black",
                color: view ? "black" : "white",
                border: "2px solid black",
              }}
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? "Close" : "View"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              style={{
                width: "25%",
                backgroundColor: "white",
                color: "black",
              }}
              onClick={DeleteNote}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              style={{
                width: "25%",

                backgroundColor: "black",
                color: "white",
              }}
              onClick={() => setEdit(!edit)}
            >
              Edit
            </Button>
          </Paper>
        )}
      </Paper>
    </div>
  );
}
