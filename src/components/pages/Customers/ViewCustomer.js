import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { useState , useEffect } from "react";
import axios from "axios";


const ViewCustomer = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://admil-panel2.herokuapp.com/customers/${id}`,
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
            View Customer
          </span>
        </div>
      </section>

      <Container style={{ color: "black", display: "flex" }}>
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
                : "https://www.computerhope.com/jargon/g/guest-user.jpg"
            }
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
          <span style={{ fontSize: "1.5rem" }}> ID : {data?.data?._id} </span>
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          <p style={{ fontSize: "2.5rem", marginTop: "0" }}> {data?.data?.name} </p>
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Contact :{" "}
            <span
              style={{
                fontWeight: "400",
                color: "#968d74",
                fontFamily: "Robotics",
              }}
            >
              {" "}
              {data?.data?.phoneNumber} 
            </span>{" "}
          </span>
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {" "}
            Email :{" "}
            <span
              style={{
                fontWeight: "400",
                color: "#968d74",
                fontFamily: "Robotics",
              }}
            >
              {" "}
              {data?.data?.email} 
            </span>{" "}
          </span>
          <hr style={{ marginTop: "5%", marginBottom: "5%" }} />
        </div>
      </Container>
    </>
  );
};

export default HOC(ViewCustomer);
