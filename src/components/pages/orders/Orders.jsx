import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";



const Orders = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://admil-panel2.herokuapp.com/order",
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

  const navigate = useNavigate();



  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders
          </span>
        </div>
      </section>
      <Table striped bordered hover style={{ marginTop: "5%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Order </th>
            <th>Delivery Date</th>
            <th>Order Value</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i) => (
            <tr>
              <td> {i._id} </td>
              <td> {i.customer} </td>
              <td> {i.order} </td>
              <td> {i.deliveryDate} </td>
              <td> {i.orderValue} </td>
              <td> {i.payment} </td>
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  {" "}
                  <AiOutlineEye
                    color="blue"
                    cursor="pointer"
                    onClick={() => navigate(`/viewOrder/${i._id}`)}
                  />
                  {/* <AiFillDelete
                    color="red"
                    cursor="pointer"
                    onClick={() => navigate(`/deleteOrder/${i.Id}`)}
                  /> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Orders);
