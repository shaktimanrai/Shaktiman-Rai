import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import Spinner from "react-bootstrap/Spinner";

const AddCat = () => {
  const navigate = useNavigate();
  const [name, setN] = useState("");
  const [url, setUrl] = useState("");
  const [image, setI] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const postDetails = (e) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dbcnha741");
    fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
        console.log(data?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://nikhil-backend.herokuapp.com/api/v1/banner",
        {
          name,
          link: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success("Banner  Added Successfully");
      navigate("/cat");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Add Banner
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
              onChange={(e) => setI(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="Name"
              placeholder="Name"
              required
              onClick={() => postDetails()}
              onChange={(e) => setN(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default HOC(AddCat);
