import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [image, setI] = useState("");
  const [name, setN] = useState("");
  const [email, setE] = useState("");
  const [phoneNumber, setP] = useState("");
  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://admil-panel2.herokuapp.com/customers",
       {
          name,
          phoneNumber,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Customer has been added successfully", {
        autoClose: 2000,
      });
      navigate("/customer");
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
            Add User
          </span>
        </div>
      </section>
      <Container
        style={{ marginTop: "5%", width: "800px", marginBottom: "15%" }}
      >
        <Form style={{ color: "black" }} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              required
            />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="7835878473	"
              required
        
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="kashyapaayush3945@gmail.com"
              required
     
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

export default HOC(AddCustomer);
