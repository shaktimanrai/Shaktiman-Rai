import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const deleteData = async () => {
      try {
        const { data } = await axios.delete(
          `https://admil-panel2.herokuapp.com/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Product Deleted Successfully')
        navigate('/products')
      } catch (err) {
        console.log(err);
      }
    };
    deleteData()
  }, [token , axios , toast]);

  return <></>;
};

export default DeleteProduct;
