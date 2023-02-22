import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";
import "./Project.css";
const Createproject = (props) => {
  const [show, setShow] = useState(true);

  const history = useNavigate();
  const handleClose = () => {
    history("/Company");
    setShow(false);
  };

  const [projectname, setprojectname] = useState("");
  const [description, setdescription] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const project = { projectname, description, startDate, endDate };

    const response = await fetch("/api/project/creatproject", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      history("/Dashboard");
      setprojectname("");
      setstartDate("");
      setendDate("");

      setError(null);
      console.log("new project created", json);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
          <br />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>
                Project Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                autoFocus
                onChange={(e) => setprojectname(e.target.value)}
                value={projectname}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{ fontWeight: "bold" }}>
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setdescription(e.target.value)}
                value={description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>Start Date</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                onChange={(e) => setstartDate(e.target.value)}
                value={startDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: "bold" }}>End Date</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                onChange={(e) => setendDate(e.target.value)}
                value={endDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Project
          </Button>
          {error && (
            <div
              className="error"
              style={{
                padding: " 10px",
                paddingLeft: "65px",
                background: " #ffefef",
                border: " 1px solid var(--error)",
                color: "red",
                borderRadius: "15px",
                margin: " 10px 0",
                marginRight: "55px",
                width: " 340px",
              }}
            >
              {error}
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Createproject;
