import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const AddProduct = () => {
  const navigate = useNavigate();

  const [image, setI] = useState("");
  const [name, setN] = useState("");
  const [mrp, setM] = useState("");
  const [stock, setS] = useState("");
  const [variant, setV] = useState("");
  const [category, setC] = useState("");
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://admil-panel2.herokuapp.com/manage-category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setData, token, axios]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://admil-panel2.herokuapp.com/products",
        {
          image: url,
          name,
          mrp,
          stock,
          variant,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product has been added successfully", {
        autoClose: 2000,
      });
      navigate("/products");
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
            Add Product
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
              type="text"
              placeholder="Hamburger"
              onClick={() => postDetails()}
              required
              onChange={(e) => setN(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="number"
              placeholder="450"
              required
              onChange={(e) => setM(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="20 "
              required
              onChange={(e) => setS(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Variants</Form.Label>
            <Form.Control
              type="number"
              placeholder="5"
              required
              onChange={(e) => setV(e.target.value)}
            />
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            required
            onChange={(e) => setC(e.target.value)}
          >
            <option>Select the category</option>
            {data?.data?.map((i, index) => (
              <option key={index} value={i._id}>
                {" "}
                {i.name}{" "}
              </option>
            ))}
          </Form.Select>

          <br />
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default HOC(AddProduct);
