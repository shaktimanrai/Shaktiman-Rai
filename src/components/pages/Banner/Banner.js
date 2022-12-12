import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Banner = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://nikhil-backend.herokuapp.com/api/v1/admin/services",
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
    
    useEffect(() => {
      fetchData();
    }, [axios, token, toast]);
  
    const navigate = useNavigate();
  
    const deleteService = async (id) => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.delete(
          `https://nikhil-backend.herokuapp.com/api/v1/admin/services/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Service Deleted Succeessfully')
        fetchData()
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <>
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
              All Services (Total : {data?.results})
            </span>
            <Button variant="success" onClick={() => navigate("/addService")}>
              Add Service
            </Button>
          </div>
        </section>
  
        <Table
          striped
          bordered
          hover
          style={{
            marginTop: "5%",
            scrollBehavior: "smooth",
            overflow: "scroll",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Summary</th>
              <th>Desription</th>
              <th>Category </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.services?.map((i) => (
              <tr>
                <td> {i.name}</td>
                <td>₹{i.price} </td>
                <td> {i.summary} </td>
                <td> {i.description} </td>
                <td> {i.slug} </td>
                <td>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    {" "}
                    <AiOutlineEdit
                      color="black"
                      cursor="pointer"
                      onClick={() => navigate(`/editService/${i._id}`)}
                    />
                    <AiOutlineEye
                      color="blue"
                      cursor="pointer"
                      onClick={() => navigate(`/viewService/${i._id}`)}
                    />
                    <AiFillDelete color="red" cursor="pointer" onClick={() => deleteService(i._id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
}

export default HOC(Banner)