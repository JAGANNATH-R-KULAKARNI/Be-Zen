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

export default function CreateUI(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const m1 = useMediaQuery("(min-width:600px)");

  const handleClose = () => {
    setOpen(false);
    props.createStatusHandler();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <TextField
              id="standard-basic"
              label="Author Name"
              variant="standard"
              placeholder="Jagannath R K"
              style={{ minWidth: "100%" }}
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              label="Heading"
              variant="standard"
              placeholder="A Note On Automation"
              style={{ minWidth: "100%" }}
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              label="Tagline"
              variant="standard"
              placeholder="#AutomationTesting"
              style={{ minWidth: "100%" }}
            />

            <TextField
              id="outlined-multiline-static"
              label="Body"
              multiline
              rows={4}
              style={{ minWidth: "100%", marginTop: "40px" }}
              placeholder="Test automation is the practice of automatically reviewing and validating a software product"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "black" }}>
            Discard
          </Button>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
