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
      console.log("Notes");
      console.log(data);

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
      console.log(temp);
      setNotes0(temp0);
      setNotes(temp);

      setControl(!control);
    }

    if (error) {
      console.log("Error");
      console.log(error.message);
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
        {control ? (
          <BlogsUI notes={notes} notes0={notes0} />
        ) : (
          <BlogsUI notes={notes} notes0={notes0} />
        )}
      </div>
    </div>
  );
}
