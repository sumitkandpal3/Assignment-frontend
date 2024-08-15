import React, { useState } from "react";
import { BiX, BiBookmark, BiChevronDown } from "react-icons/bi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { BsHouseDoor } from "react-icons/bs";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdFlight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaDatabase, FaImages, FaBlog } from "react-icons/fa6";
import { MdContentPaste } from "react-icons/md";
import { CgProductHunt } from "react-icons/cg";
import { AiFillProduct } from "react-icons/ai";

const SideBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <span
        className="fixed z-20 lg:hidden text-white text-4xl md:text-5xl top-3 md:top-1 left-2 cursor-pointer"
        onClick={toggleSidebar}
      >
        <HiMiniBars3BottomLeft className="px-2 bg-transparent rounded-md" />
      </span>
      <div
        className={`sidebar transition-all duration-300 ease-in-out fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] lg:w-[270px] overflow-y-auto text-center bg-slate-800 z-40 ${
          !isSidebarOpen ? "-left-[300px]" : "left-0"
        }`}
      >
        <div className="text-gray-100 text-xl">
          <div className="w-full p-2.5  py-1 mt-1 flex items-center justify-between gap-10">
            <div className="flex items-center">
              <MdFlight className="px-2 py-1 text-3xl rounded-md bg-blue-600" />
              <h1 className="font-bold text-gray-200 text-sm md:text-lg ml-3">
                My Store
              </h1>
            </div>
            <BiX className="cursor-pointer lg:hidden" onClick={toggleSidebar} />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]" />
        </div>

        <NavLink
          to={"/admin"}
          className={({ isActive }) =>
            `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${
              isActive && "bg-blue-600"
            }`
          }
        >
          <BsHouseDoor />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
        </NavLink>
        <NavLink className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
          <BiBookmark />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Analytics
          </span>
        </NavLink>

        <div className="my-4 bg-gray-600 h-[1px]" />

        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => toggleDropdown("product")}
        >
          <AiFillProduct />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Product
            </span>
            <span
              className={`text-lg transition-transform duration-300 ${
                openDropdown === "product" ? "rotate-180" : ""
              }`}
            >
              <BiChevronDown />
            </span>
          </div>
        </div>
        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
            openDropdown === "product" ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
            <NavLink
              to={"/admin/product/create"}
              className={({ isActive }) =>
                `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${
                  isActive && "bg-blue-600"
                }`
              }
            >
              New product Entry
            </NavLink>
            <NavLink
              to={"/admin/products/all"}
              className={({ isActive }) =>
                `p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${
                  isActive && "bg-blue-600"
                }`
              }
            >
              View All products
            </NavLink>
          </div>
        </div>

        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={() => toggleDropdown("blogs")}
        >
          <FaBlog />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Blogs
            </span>
            <span
              className={`text-lg transition-transform duration-300 ${
                openDropdown === "blogs" ? "rotate-180" : ""
              }`}
            >
              <BiChevronDown />
            </span>
          </div>
        </div>
        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
            openDropdown === "blogs" ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
            <NavLink to={"/admin/blogs/new"}>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                New Blog Entry
              </h1>
            </NavLink>
            <NavLink to={"/admin/blogs/all"}>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                View Blogs
              </h1>
            </NavLink>
          </div>
        </div>

        <div className="my-4 bg-gray-600 h-[1px]" />

        <NavLink
          to={"/login"}
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <FaArrowRightToBracket />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Logout
          </span>
        </NavLink>
      </div>
    </>
  );
};

export default SideBar;
