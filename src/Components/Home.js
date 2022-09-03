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
  const [notes, setNotes] = React.useState([]);

  const getNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("time_edited", { ascending: false });

    if (data) {
      console.log("Notes");
      console.log(data);
      setNotes(data);
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
        <BlogsUI notes={notes} />
      </div>
    </div>
  );
}
