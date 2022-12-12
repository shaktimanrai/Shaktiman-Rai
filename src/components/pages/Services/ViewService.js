import React from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewService = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://nikhil-backend.herokuapp.com/api/v1/admin/services/${id}`,
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
  }, [axios, token]);
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            View Service {id}
          </span>
        </div>
      </section>
      <Container style={{ color: "black", marginTop: "5%" }}>
  
        <div
          className="right"
          style={{
            marginRight: "100px",
            width: "80%",
            padding: "10px",
          }}
        >
          <p style={{ fontSize: "2.5rem", marginTop: "0" }}>{data?.data?.service?.name} </p>
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Category :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {" "}
              {data?.data?.service?.slug}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Summary :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {" "}
              {data?.data?.service?.summary}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Description :{" "}
            <span style={{ fontWeight: "400", color: "#968d74" }}>
              {" "}
              {data?.data?.service?.description}
            </span>{" "}
            <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          </span>
          <h2 style={{ fontFamily: "Robotics" }}> ₹{data?.data?.service?.price} </h2>{" "}
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
        </div>
      </Container>
    </>
  );
};

export default HOC(ViewService);
