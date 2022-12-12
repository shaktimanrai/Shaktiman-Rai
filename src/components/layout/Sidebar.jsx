/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { IoMdChatboxes } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillImageFill, BsCartCheck } from "react-icons/bs";
import { HiCurrencyRupee } from "react-icons/hi";
import {
  MdDashboardCustomize,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/dashboard",
      name: "Dashboard",
    },
    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/customer",
      name: "Users",
    },
    {
      icon: <HiCurrencyRupee className="text-xl mr-3" />,
      link: "/addTLT",
      name: "Add TLT Value",
    },
    {
      icon: <HiCurrencyRupee className="text-xl mr-3" />,
      link: "/tlt",
      name: "TLT",
    },
    {
      icon: <MdOutlineMiscellaneousServices className="text-xl mr-3" />,
      link: "/service",
      name: "User Subscription",
    },
    {
      icon: <BsFillImageFill className="text-xl mr-3" />,
      link: "/cat",
      name: "Banner",
    },
    {
      icon: <BsFillImageFill className="text-xl mr-3" />,
      link: "/inventory",
      name: "Lands",
    },
    // {
    //   icon: <BsCartCheck className="text-xl mr-3" />,
    //   link: "/discount",
    //   name: "Carts",
    // },
    // {
    //   icon:,
    //   link: "https://salesiq.zoho.in/flyweistechnology/liveview",
    //   name: "",
    // },
  ];

  const logOut = async (e) => {
    localStorage.removeItem("token");
    toast.success("Log-Out SuccessFull");
    navigate("/");
  };

  return (
    <>
      <aside className="p-4">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        {/* Logo */}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[rgb(241,146,46)]"
            style={{ fontSize: "2rem", textAlign: "center" }}
          >
            Admin Panel
          </span>
        </figure>
        {/* Nav-menu */}
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}

          {/* <a
            href="https://salesiq.zoho.in/flyweistechnology/liveview"
            target="_blank"
            style={{ color: " black", textDecoration: "none" }}
          >
            <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
              <IoMdChatboxes className="text-xl mr-3" /> Chats
            </span>
          </a> */}

          <span
            onClick={() => logOut()}
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
          >
            <BiLogOutCircle className="text-xl mr-3" /> Logout
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
