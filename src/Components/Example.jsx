import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";

const Example = (props) => {
  return (
    <>
      <Button variant="primary" className="d-none" onClick={props.handleShow}>
        Launch demo modal
      </Button>

      <Modal show={props.show} onHide={props.handleClose}>
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
                  onChange={props.handleOnChange}
                  value={props.note.etitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="edescription"
                  placeholder="Desc."
                  onChange={props.handleOnChange}
                  value={props.note.edescription}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="etag"
                  placeholder="tag"
                  onChange={props.handleOnChange}
                  value={props.note.etag}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              props.note.etitle.length < 5 || props.note.edescription.length < 5
            }
            variant="primary"
            type="submit"
            onClick={props.handleOnClick}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Example;
