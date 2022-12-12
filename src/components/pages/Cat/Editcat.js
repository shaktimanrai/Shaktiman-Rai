import React from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Editcat = () => {

    const { id } = useParams();
    const navigate = useNavigate();
  
    const submitHandler = async () => {
      toast.success("Category has been Edited successfully", {
        autoClose: 2000,
      });
      navigate("/cat");
    };
  return (
   <>
   <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Edit Category {id}
          </span>
        </div>
      </section>

      <Container
        style={{ marginTop: "5%", width: "800px", marginBottom: "15%" }}
      >
        <Form style={{ color: "black" }} onSubmit={submitHandler}>
  
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Aayush " required />
          </Form.Group>

          <Button variant="success" type="submit">
            Edit
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default HOC(Editcat)