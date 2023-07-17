import React, { useState, useEffect } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: "",
    _id: "",
    uuid: uuidv4() 
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

    
     const newUUID = uuidv4();
    // console.log("***** newUUID = " + newUUID);
     setNote(previousState => {
       return { ...previousState, uuid: newUUID }
     });
    
    async function doPostRequest() {

      let payload = { title: note.title, content: note.content, _id: note._id, uuid: note.uuid };
  
      let res = await axios.post('http://localhost:5000/notes', payload);
  
      let data = res.data;
      console.log(data);
      console.log(data.id);

      setNote(previousState => {
        return { ...previousState, _id: data.id }
      });

      console.log("******** doPostRequest - console.log(note)");
      console.log(note);
    }
  
    doPostRequest();

     console.log("******* onAdd note");
     console.log(note);
     props.onAdd(note);
    
    setNote({
      title: "",
      content: "",
      _id: "",
      uuid: ""
    });
    
    //setExpanded(false);
    //event.preventDefault();
  }
  const [isExpanded, setExpanded] = useState(false);
  
  return (
    <div>
      <form className="create-note" >
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
          <Fab onClick={submitNote} >
            <AddCardIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
