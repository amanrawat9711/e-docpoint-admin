import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, appointmentCancel } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-xl font-medium">All Appointments</p>
      <div className="bg-white text-sm overflow-y-scroll min-h-[60vh] border-gray-100 rounded">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1.5fr_3.5fr_3fr_1.3fr_0.8fr] grid-flow-col px-6 py-3 border-b ">
          <p>#</p>
          <p>Patient Name</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((items, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 border-b hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-18 rounded-full" src={items.userData.image} />
              <p>{items.userData.name}</p>
            </div>
            <p>{calculateAge(items.userData.dob)}</p>
            <p>
              {slotDateFormat(items.slotDate)},{items.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img className="w-18 rounded-full" src={items.docData.image} />
              <p>{items.docData.name}</p>
            </div>
            <p>${items.amount}</p>
            {items.cancelled ? (
              <p className="text-sx font-medium text-red-500">Cancelled</p>
            ) : items.isCompleted ? <p className="text-sx font-medium text-green-500">Completed</p> :(
              <img
                className="w-10 cursor-pointer"
                onClick={() => appointmentCancel(items._id)}
                src={assets.cancel_icon}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
