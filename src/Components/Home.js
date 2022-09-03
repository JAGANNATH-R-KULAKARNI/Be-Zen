import React from "react";
import mainImage from "./Images/main.jpg";
import mainImage2 from "./Images/main2.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateNoteUI from "./CreateNote";
export default function Home() {
  const m1 = useMediaQuery("(min-width:600px)");

  return (
    <div>
      <img
        src={m1 ? mainImage : mainImage2}
        alt="Main Image"
        style={{
          width: "100%",
          height: m1 ? "613px" : "auto",
          marginTop: "100px",
        }}
      />
      <div style={{ marginTop: m1 ? "50px" : "-60px" }}>
        <CreateNoteUI />
      </div>
      <br />
    </div>
  );
}
