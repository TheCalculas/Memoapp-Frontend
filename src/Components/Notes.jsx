import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/Notes/NoteContext";
import { Form, Button, Modal } from "react-bootstrap";
import AddNote from "./AddNote";
import { Container } from "react-bootstrap";
import MemoItem from "./MemoItem";
import { useNavigate } from "react-router-dom";

function Notes() {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

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
  const ref = useRef(null);
  const updateNote = (note1) => {
    ref.current.click();
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

  function Example() {
    return (
      <>
        <Button
          variant="primary"
          ref={ref}
          className="d-none"
          onClick={handleShow}
        >
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="mb-md-3">
              <Form className="mt-5">
                <h1>Create Memo</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="etitle"
                    placeholder="Enter Title"
                    onChange={handleOnChange}
                    value={note.etitle}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="edescription"
                    placeholder="Desc."
                    onChange={handleOnChange}
                    value={note.edescription}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="etag"
                    placeholder="tag"
                    onChange={handleOnChange}
                    value={note.etag}
                  />
                </Form.Group>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={note.etitle.length < 5 || note.edescription.length < 5}
              variant="primary"
              type="submit"
              onClick={handleOnClick}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      <AddNote />

      <Example />

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
