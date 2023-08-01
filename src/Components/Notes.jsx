import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/Notes/NoteContext";

import Example from "./Example";
import AddNote from "./AddNote";
import { Container } from "react-bootstrap";
import MemoItem from "./MemoItem";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;

  useEffect(() => {
    const fetchBusinesses = () => {
      // console.log(window.localStorage.getItem("token"));
      window.localStorage.getItem("token") ? getAllNotes() : navigate(`/login`);
    };
    fetchBusinesses();
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (note1) => {
    handleShow();
    setNote({
      id: note1._id,
      etitle: note1.title,
      edescription: note1.description,
      etag: note1.tag,
    });
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("Updating the note");
    console.log(note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    handleClose();
  };
  const handleOnChange = (event) => {
    event.preventDefault();

    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      <AddNote />

      <Example
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
        note={note}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />

      <Container>
        <h2>Your Memos</h2>
        <div className="row my-3" style={{ flexDirection: "row" }}>
          {notes.map((note1) => {
            return (
              <MemoItem key={note1._id} updateNote={updateNote} note={note1} />
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default Notes;
