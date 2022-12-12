
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteOrder = async () => {
      navigate("/orders");
      return toast.success(`Order ${id} has deleted Successfully ` , {
        autoClose : 2000 ,
       

      });
    };

    deleteOrder();
  });

  return <></>;
};

export default DeleteOrder;
