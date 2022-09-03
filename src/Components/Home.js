import React from "react";
import mainImage from "./Images/main.jpg";
import mainImage2 from "./Images/main2.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreateNoteUI from "./CreateNote";
import BeginningUI from "./Utilities/Beginning";
import BlogsUI from "./Blogs";
import { supabase } from "../Supabase";

export default function Home() {
  const m1 = useMediaQuery("(min-width:600px)");
  const [notes0, setNotes0] = React.useState([]);
  const [notes, setNotes] = React.useState([]);
  const [control, setControl] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [notes2, setNotes2] = React.useState([]);

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  const getNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("time_edited", { ascending: false });

    if (data) {
      const temp0 = [];
      const temp = [];

      for (var i = 0; i < data.length; i++) {
        var tt = timeSince(
          new Date(Date.now() - (Date.now() - parseInt(data[i].time_edited)))
        );

        if (data[i].isPinned) {
          temp0.push({
            ...data[i],
            time_edited: tt,
          });
        } else {
          temp.push({
            ...data[i],
            time_edited: tt,
          });
        }
      }

      setCount(
        Math.floor((temp.length + temp0.length) / 6) +
          ((temp.length + temp0.length) % 6 ? 1 : 0)
      );

      var temp2 = [];
      const temp3 = [];
      var refe = 0;

      for (var j = 0; j < temp0.length; j++) {
        if (refe == 6) {
          temp3.push(temp2);
          temp2 = [];
          refe = 0;
        }
        refe++;
        temp2.push(temp0[j]);
      }

      for (var k = 0; k < temp.length; k++) {
        if (refe == 6) {
          temp3.push(temp2);
          temp2 = [];
          refe = 0;
        }
        refe++;
        temp2.push(temp[k]);
      }

      temp3.push(temp2);

      setNotes0(temp0);
      setNotes(temp);
      setNotes2(temp3);
      setControl(!control);
    }

    if (error) {
    }
  };

  React.useEffect(() => {
    setInterval(() => {
      getNotes();
    }, 1000);
  }, []);
  return (
    <div>
      <img
        src={m1 ? mainImage : mainImage2}
        alt="Main Image"
        style={{
          width: "100%",
          height: m1 ? "613px" : "auto",
          marginTop: m1 ? "96px" : "76px",
        }}
      />
      <div style={{ marginTop: m1 ? "50px" : "-60px" }}>
        <CreateNoteUI />
      </div>
      {m1 ? <br /> : null}
      <div style={{ marginTop: m1 ? "0px" : "-30px" }}>
        <BeginningUI />
      </div>
      <div style={{ marginTop: m1 ? "0px" : "-30px" }}>
        {control && notes && notes0 && notes2 ? (
          <BlogsUI
            notes={notes}
            notes0={notes0}
            count={count}
            notes2={notes2}
          />
        ) : (
          <BlogsUI
            notes={notes}
            notes0={notes0}
            count={count}
            notes2={notes2}
          />
        )}
      </div>
    </div>
  );
}
