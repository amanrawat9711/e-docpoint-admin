import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen border-r bg-white">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? `border-r-4 border-indigo-500 bg-[#F2F3FF]`
                  : ""
              } `
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? `border-r-4 border-indigo-500 bg-[#F2F3FF]`
                  : ""
              } `
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} />
            <p className="hidden md:block">Add Doctors</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? `border-r-4 border-indigo-500 bg-[#F2F3FF]`
                  : ""
              } `
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} />
            <p className="hidden md:block">All Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? `border-r-4 border-indigo-500 bg-[#F2F3FF]`
                  : ""
              } `
            }
            to={"/doctors-list"}
          >
            <img src={assets.people_icon} />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? `border-r-4 border-indigo-500 bg-[#F2F3FF]`
                  : ""
              } `
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? `border-r-4 border-indigo-500 bg-[#F2F3FF]`
                  : ""
              } `
            }
            to={"/doctor-appointment"}
          >
            <img src={assets.appointment_icon} />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive
                  ? `border-r-4 border-indigo-500 bg-[#F2F3FF]`
                  : ""
              } `
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
