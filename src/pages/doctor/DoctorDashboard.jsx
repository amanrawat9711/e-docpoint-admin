import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
const DoctorDashboard = () => {
  const { dToken, dashData, doctorDashboard,slotDateFormat,cancelAppointment ,completeAppointment} =
    useContext(DoctorContext);
  useEffect(() => {
    if (dToken) {
      doctorDashboard();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 cursor-pointer rounded border-gray-100 hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                ${dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 cursor-pointer rounded border-gray-100 hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 cursor-pointer rounded border-gray-100 hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} />
            <p className="font-semibold">Latest Appointment</p>
          </div>
          <div className="pt-4 border border-t-0">
  {dashData.latestAppointments?.length > 0 ? (
    dashData.latestAppointments.map((items, index) => (
      <div
        className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
        key={index}
      >
        <img className="w-15 rounded-full" src={items.userData.image} />
        <div className="flex-1 ">
          <p className="text-gray-800 font-medium text-md">
            {items.userData.name}
          </p>
          <p className="text-gray-600 text-sm">
            Booking on {slotDateFormat(items.slotDate)}
          </p>
        </div>
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
    ))
  ) : (
    <p className="text-center text-gray-500 py-4">No appointments found.</p>
  )}
</div>

        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
