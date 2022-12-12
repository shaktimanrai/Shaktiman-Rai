import React from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Container } from "react-bootstrap";
import "./Order.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ViewOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://admil-panel2.herokuapp.com/order/${id}`,
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
  }, [axios, setData, token]);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            View Order {id}
          </span>
        </div>
      </section>
      <Container style={{ color: "black", marginTop: "5%" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h5>ID</h5>
            <p className="OrderP"> {data?.data?._id} </p>
          </div>
          <div>
            <h5>Customer</h5>
            <p className="OrderP"> {data?.data?.customer} </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h5>Order </h5>
            <p className="OrderP">{data?.data?.order}</p>
          </div>
          <div>
            <h5>Delivery Date</h5>
            <p className="OrderP">{data?.data?.deliveryDate}</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h5>Order Value</h5>
            <p className="OrderP">{data?.data?.orderValue}</p>
          </div>
          <div>
            <h5>Payment</h5>
            <p className="OrderP">{data?.data?.payment}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HOC(ViewOrder);
