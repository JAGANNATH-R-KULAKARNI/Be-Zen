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
      <div
        style={{
          width: "100%",
          paddingLeft:
            props.notes.length > 0 || props.notes0.length > 0 ? "10%" : "0%",
        }}
      >
        {props.notes0 &&
          props.notes0.map((item) => {
            return (
              <div key={item}>
                <CardUI data={item} />
                <br />
                <br />
              </div>
            );
          })}
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
        {props.notes0.length == 0 && props.notes.length == 0 ? (
          <h1
            style={{ textAlign: "center", width: "100%", marginTop: "-20px" }}
          >
            ** No Blogs Yet **
          </h1>
        ) : null}
      </div>
    </div>
  );
}
