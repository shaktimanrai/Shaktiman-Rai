import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteOrder = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.delete(
          `https://admil-panel2.herokuapp.com/customers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Customer Deleted Succeessfully");
        navigate('/customer')
      } catch (err) {
        console.log(err);
      }
    };
    deleteOrder();
  });

  return <></>;
};

export default DeleteCustomer;
