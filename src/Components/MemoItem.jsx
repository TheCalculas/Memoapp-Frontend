import { React, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import NoteContext from "../Context/Notes/NoteContext";
function MemoItem(props) {
  const { deleteNote } = useContext(NoteContext);
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <Button
            className="btn btn-success mx-md-1"
            onClick={() => {
              updateNote(note);
            }}
          >
            Update
          </Button>
          <Button
            className="btn btn-danger mx-md-1"
            onClick={() => {
              deleteNote(note._id);
            }}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MemoItem;
