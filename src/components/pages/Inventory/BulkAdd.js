import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const BulkAdd = () => {
  const navigate = useNavigate();

  const submitHandler = async () => {
    toast.success("Inventory  has been added successfully", {
      autoClose: 2000,
    });
    navigate("/inventory");
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Add Bulk Inventory
          </span>
        </div>
      </section>
      <Container
        style={{ marginTop: "5%", width: "800px", marginBottom: "15%" }}
      >
        <Form style={{ color: "black" }} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Add</Form.Label>
            <Form.Control type="file" placeholder="Discount" required />
          </Form.Group>
         
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default HOC(BulkAdd);
