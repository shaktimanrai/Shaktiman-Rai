import React from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const ViewProduct = () => {
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://admil-panel2.herokuapp.com/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data);
      } catch (err) {
        console.log(err);
        toast.error("err", err);
      }
    };
    fetchData();
  }, [axios, token, toast]);
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            View Product {id}
          </span>
        </div>
      </section>
      <Container style={{ color: "black", display: "flex"  , marginTop : '5%'}}>
        <div
          className="left"
          style={{
            // border: "2px solid black",
            width: "50%",
            textAlign: "center",
          }}
        >
          <img
            src={
              data?.data?.image
                ? data?.data?.image
                : "https://cdn.pixabay.com/photo/2018/04/17/17/15/italian-3328121_960_720.png"
            }
            alt={data?.data?.name}
            style={{ width: "400px", height: "400px" }}
          />
        </div>
        <div
          className="right"
          style={{
            // marginLeft: "200px",
            marginRight: "100px",
            // border: "2px solid black",
            width: "50%",
            padding: "10px",
            // textAlign: "center",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}> {data?.data?._id} </span>
          <hr style={{ marginTop: "5%" }} />
          <p style={{ fontSize: "2.5rem", marginTop: "0" }}>
            {data?.data?.name}
          </p>
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Category :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {" "}
              {data?.data?.category}
            </span>{" "}
            <h4 style={{ fontWeight: "400", marginTop: "3%" }}>
              {" "}
              <Badge bg="success">In Stock</Badge> : {data?.data?.stock}{" "}
            </h4>
            <h4 style={{ fontWeight: "400", marginTop: "3%" }}>
              {" "}
              <Badge bg="success">Variant</Badge> : {data?.data?.variant}{" "}
            </h4>
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <h2 style={{ fontFamily: "Robotics" }}> ₹{data?.data?.mrp}</h2>{" "}
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
        </div>
      </Container>
    </>
  );
};

export default HOC(ViewProduct);
