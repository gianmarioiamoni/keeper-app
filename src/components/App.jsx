import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:5000/api',
  baseURL: 'http://localhost:5000',
});

const insertNote = payload => api.post(`/notes`, payload);

function App() {
  const [notes, setNotes] = useState([]);
  const [deletedNoteId, setDeletedNoteId] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/notes")
    .then((data) => {
      console.log(data);
      setNotes(data?.data);
    })
    .catch( (err) => console.log(err));
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id, _id) {

    axios.delete(`http://localhost:5000/notes/${_id}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

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
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
