import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const AdminHeader = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="sticky top-0 flex justify-between lg:justify-end items-center bg-slate-800 p-4 text-white h-[11vh] md:h-[9.5vh]">
      <div className="block lg:hidden text-[1rem] font-bold ml-10">MyStore</div>

      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleProfileDropdown}
        >
          <FaUserCircle className="text-3xl mr-2" />
          <span className="font-semibold text-sm">Admin Name</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
