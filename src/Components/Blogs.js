import React from "react";
import CardUI from "./Utilities/Card";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Blogs(props) {
  const m1 = useMediaQuery("(min-width:600px)");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", paddingLeft: "10%" }}>
        {props.notes &&
          props.notes.map((item) => {
            return (
              <div key={item}>
                <CardUI data={item} />
                <br />
                <br />
              </div>
            );
          })}
      </div>
    </div>
  );
}
