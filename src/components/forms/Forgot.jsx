import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";
import { BiCycling, BiLogInCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BaseUrl from "../BaseUrl";
import { Oval } from "react-loader-spinner";
import image from "../../../src/assets/Final Direct2U Logo-01.png";

const Forgot = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (values) => {
    setLoading(true);
    const url = BaseUrl() + "/seller/forgotpassword";

    try {
      const res = await axios.post(url, values);
      console.log("res", res);

      setLoading(false);
      navigate("/verifyOtp");
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-100">
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            forgotPassword(values);
          }}
        >
          <Form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 rounded-tl-3xl rounded-br-3xl">
            <span className="text-2xl font-bold text-center text-[rgb(241,146,46)]">
              <img src={image} className="h-28" />
            </span>
            <section className="py-7 space-y-6">
              {/* Email */}
              <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
                <Field
                  type="email"
                  placeholder="username@gmail.com"
                  name="email"
                  required
                  className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                />
                <HiOutlineMail className="text-xl " />
              </div>

              <button
                type="submit"
                className="py-2 cursor-pointer tracking-wider bg-[rgb(241,146,46)] flex justify-center items-center w-full rounded-md font-medium   "
              >
                {loading ? (
                  <Oval height={30} secondaryColor="black" color="black" />
                ) : (
                  <div className="flex items-center">
                    <span className="flex items-center justify-center">
                      Send Otp
                    </span>
                    <BiLogInCircle className="pl-1.5 text-2xl" />
                  </div>
                )}
              </button>
            </section>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Forgot;
