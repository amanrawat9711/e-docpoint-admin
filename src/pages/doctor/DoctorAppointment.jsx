import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    appointmentdoctors,
    calculateAge,
    slotDateFormat,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  useEffect(() => {
    if (dToken) {
      appointmentdoctors();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white max-h-[80vh] border rounded min-h-[30vh] text-sm overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Appointment Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((items, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 items-center text-gray-600 px-3 py-6 border-b hover:bg-gray-100"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-12 rounded-full" src={items.userData.image} />
              <p>{items.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-indigo-500 px-2 rounded-full">
                {items.payment ? "Online" : "Cash"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(items.userData.dob)}</p>
            <p>
              {slotDateFormat(items.slotDate)},{items.slotTime}
            </p>
            <p>${items.amount}</p>
            {items.cancelled ? (
              <p className="text-red-500 text-sm font-medium" >Cancelled</p>
            ) : items.isCompleted ? <p className="text-green-500 text-sm font-medium" >Completed</p>: (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(items._id)}
                  className="w-12 cursor-pointer"
                  src={assets.cancel_icon}
                />
                <img
                  onClick={() => completeAppointment(items._id)}
                  className="w-12 cursor-pointer"
                  src={assets.tick_icon}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
