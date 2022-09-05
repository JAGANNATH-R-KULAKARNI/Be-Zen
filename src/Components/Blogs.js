import React from "react";
import CardUI from "./Utilities/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";

export default function Blogs(props) {
  const m1 = useMediaQuery("(min-width:600px)");
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      {props.notes.length > 0 || props.notes0.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: m1 ? "-50px" : "-40px",
          }}
        >
          <Pagination
            count={props.count}
            color="secondary"
            page={page}
            onChange={handleChange}
          />
        </div>
      ) : null}
      <br />
      <br />
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
          {props.notes2 &&
            props.notes2.map((item, index) => {
              if (index + 1 == page) {
                return (
                  item &&
                  item.map((igkey) => {
                    return (
                      <div key={igkey}>
                        <CardUI data={igkey} />
                        <br />
                        <br />
                      </div>
                    );
                  })
                );
              }
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
      <br />
      <br />
      <br />
      {props.notes.length > 0 || props.notes0.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: m1 ? "-50px" : "-40px",
          }}
        >
          <Pagination
            count={props.count}
            color="secondary"
            page={page}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
}
