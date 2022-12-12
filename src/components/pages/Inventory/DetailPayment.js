import React from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Container } from "react-bootstrap";
import { useState ,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DetailPayment = () => {
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://admil-panel2.herokuapp.com/inventory/${id}`,
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
            View Inventory {id}
          </span>
        </div>
      </section>
      <Container style={{ color: "black", marginTop: "5%" }}>
        <div>
          <div>
            <h5>ID</h5>
            <p className="OrderP"> {data?.data?._id} </p>
          </div>
          <div>
            <h5>Product Detail</h5>
            <p className="OrderP"> {data?.data?.productDetail} </p>
          </div>
        </div>
        <div>
          <div>
            <h5>Quantity</h5>
            <p className="OrderP"> {data?.data?.quantity}unit </p>
          </div>
        
        </div>
      </Container>
    </>
  );
};

export default HOC(DetailPayment);
