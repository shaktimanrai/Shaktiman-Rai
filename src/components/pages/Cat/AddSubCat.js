import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const AddSubCat = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { id } = useParams();

  const [subCategory, setSub] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://admil-panel2.herokuapp.com/manage-category/${id}`,
        {
          subCategory,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Sub-Category  Added Successfully");
      navigate("/cat");
    } catch (err) {
      console.log(err);
      toast.error("please try again later");
    }
  };
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Add Sub-Category
          </span>
        </div>
      </section>
      <Container
        style={{
          marginTop: "5%",
          width: "800px",
          marginBottom: "15%",
          border: "1px solid black",
          padding: "5%",
        }}
      >
        <Form style={{ color: "black" }} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="New"
              required
              onChange={(e) => setSub(e.target.value)}
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

export default HOC(AddSubCat);
