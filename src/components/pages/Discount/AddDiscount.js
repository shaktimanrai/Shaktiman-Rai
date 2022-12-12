import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const AddDiscount = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [name, setN] = useState("");
  const [discountPercentage, setD] = useState("");
  const [startingDate, setS] = useState("");
  const [endDate, setE] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://admil-panel2.herokuapp.com/dis-count",
        {
          name,
          discountPercentage,
          startingDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Discount added successfully");
      navigate("/discount");
    } catch (err) {
      console.group(err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Add Discount
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
              placeholder="Discount"
              required
              onChange={(e) => setN(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Discount Percentage</Form.Label>
            <Form.Control
              type="number"
              placeholder="56"
              required
              onChange={(e) => setD(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Starting Date </Form.Label>
            <Form.Control
              type="date"
              placeholder="56/22/2020"
              required
              onChange={(e) => setS(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ending Date </Form.Label>
            <Form.Control
              type="date"
              required
              onChange={(e) => setE(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default HOC(AddDiscount);
