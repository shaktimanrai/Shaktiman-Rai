import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [Name, setName] = useState("");
  const [role, setRole] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `https://nikhil-backend.herokuapp.com/api/v1/users/${id}`,
        { Name, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User has been Edited successfully", {
        autoClose: 2000,
      });
      navigate("/customer");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Edit User
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
              style={{ width: "400px" }}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            style={{ width: "400px" }}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
          <br />
          <Button variant="outline-success" type="submit">
            Edit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default HOC(EditCustomer);
