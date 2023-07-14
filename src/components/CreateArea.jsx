import React, { useState } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    _id: "" 
  });

  function handleChange(event) {
    const { name, value } = event.target;


    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {

   axios.post(`http://localhost:5000/notes`, { note })
   .then((res) => {
     console.log(res);
     console.log(res.data);
     console.log("axios");
    })
    .catch( (err) => {
      console.log(err);
    });
    
    props.onAdd(note);
    
    setNote({
      title: "",
      content: "",
      _id: ""
    });
    //setExpanded(false);
    event.preventDefault();
  }
  const [isExpanded, setExpanded] = useState(false);
  
  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          onClick={() => {
            if (!isExpanded) {
              setExpanded(true); 
            }
          }}
          value={note.title}
          placeholder={isExpanded ? "Title" : "Take a note..."}
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
          hidden={isExpanded ? false : true}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddCardIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
