import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
// });

// const insertNote = payload => api.post(`/notes`, payload);

function App() {
  const [notes, setNotes] = useState([]);
  const [deletedNoteId, setDeletedNoteId] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/notes")
    .then((data) => {
      console.log("**** useEffect");
      console.log(data);
      console.log(data?.data);

      setNotes(data?.data);
    })
    .catch( (err) => console.log(err));
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id, _id, title, content) {
    axios.delete(`http://localhost:5000/notes/${id}`,
    {data: {
      title: title,
      content: content
    }}
    )
    .then((response) => {
      console.log(response);
      console.log(response.data);
    });

    setNotes(prevNotes => {
      return notes.filter((noteItem, index) => {
        //return index !== id;
        console.log(noteItem.title + " " + title);
        console.log(noteItem.content + " " + content);
        return ((noteItem.title !== title) || (noteItem.content !== content));
      });

    });
    console.log("***** deleteNote()");
    //console.log("notes = " + notes);
    notes.map((noteItem) => {
      console.log(noteItem.title);
      console.log(noteItem.content);
    });

  } // function deleteNote()

  function modifyNote(id, _id, title, content, oldTitle, oldContent) {
    axios.put(`http://localhost:5000/notes/${id}`,
     {
       title: title,
       content: content,
       oldTitle: oldTitle,
       oldContent: oldContent
     }
     )
     .then((response) => {
       console.log(response);
       console.log(response.data);
     });

     const noteItem = {
      title: title,
      content: content,
      _id: ""
     };

    setNotes(prevNotes => {
      return notes.fill(noteItem, id, id+1); 
    });
     console.log("modifyNote");
     console.log(title);
     console.log(content);
     console.log(notes)
  } // function modifyNote()

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            _id={noteItem._id}
            onDelete={deleteNote}
            onModify={modifyNote}
          />
        );
      })}
      <Footer />
    </div>
  );

} // function App()

export default App;
