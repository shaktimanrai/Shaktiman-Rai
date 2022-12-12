import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import { useState } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const AddService = () => {
  const navigate = useNavigate();

  const [name, setN] = useState("");
  const [price, setP] = useState("");
  const [summary, setS] = useState("");
  const [description, setD] = useState("");
  const [category, setC] = useState("");

  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://nikhil-backend.herokuapp.com/api/v1/admin/services",
        {
          name,
          price,
          description,
          summary,
          category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Service has been added successfully", {
        autoClose: 2000,
      });
      navigate("/service");
    } catch (err) {
      console.log(err);
      toast.error("err", err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Add Service
          </span>
        </div>
      </section>
      <Container
        style={{ marginTop: "5%", width: "800px", marginBottom: "15%" }}
      >
        <Form style={{ color: "black" }} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setN(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="500" required  onChange={(e) => setP(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              type="text"
              placeholder="This is an..."
              required
              onChange={(e) => setS(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="This is an..."
              required
              onChange={(e) => setC(e.target.value)}
            />
          </Form.Group>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              onChange={(e) => setD(e.target.value)}
            />
          </FloatingLabel>

          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default HOC(AddService);
