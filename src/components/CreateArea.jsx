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

  let newNote = {
    title: "",
    content: "",
    _id: "" 
  };

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

    async function doPostRequest() {

      let payload = { title: note.title, content: note.content, _id: note._id };
  
      let res = await axios.post('http://localhost:5000/notes', payload);
  
      let data = res.data;
      console.log(data);
      console.log(data.id);

      newNote = {
        title: note.title,
        content: note.content,
        _id: data.id
      };

      console.log("******** console.log(newNote)")
      console.log(newNote);

      setNote(previousState => {
        return { ...previousState, _id: data.id }
      });
    
      // setNote({
      //   title: note.title,
      //   content: note.content,
      //   _id: data.id.toString() 
      // });
   
      console.log("******** doPostRequest - console.log(note)");
      console.log(note);
      // setNote((prevNote) => {
      //   return {
      //     ...prevNote,
      //     noteId: data.id 
      //   };
      // });
    }
  
    doPostRequest();

    console.log("******* onAdd note");
    console.log(note);
    props.onAdd(note);
    //props.onAdd(newNote);
    
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
