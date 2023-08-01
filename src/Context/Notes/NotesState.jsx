import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesInit = [];
  const [notes, setNotes] = useState(notesInit);

  const getAllNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
    });
    // const json = response.json();
    const json = await response.json();
    setNotes(json);
    console.log(json);
  };

  // for adding a note in the app
  const addNote = async (title, description, tag) => {
    // to do -> api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const NewNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(NewNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenode/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": window.localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // Iski Deep copy ban jaayegi
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, setNotes, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;
