import React, { useContext, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NoteContext from "../Context/Notes/NoteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Default",
  });
  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Container className="mb-md-3">
        <Form className="mt-5">
          <h1>Create Memo</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Desc."
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="tag"
              placeholder="tag"
              onChange={handleOnChange}
            />
          </Form.Group>

          <Button
            disabled={note.title.length < 5 || note.description.length < 5}
            variant="primary"
            type="submit"
            onClick={handleOnClick}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddNote;
