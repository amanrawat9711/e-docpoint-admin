import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { adminDashboard, appointmentCancel, aToken, dashData, } =
    useContext(AdminContext);

    const {slotDateFormat} = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      adminDashboard();
    }
  }, [aToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 border-2 cursor-pointer rounded border-gray-100 hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
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
            {dashData.latestAppointments.map((items, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img className="w-15 rounded-full" src={items.docData.image} />
                <div className="flex-1 ">
                  <p className="text-gray-800 font-medium text-md">
                    {items.docData.name}
                  </p>
                  <p className="text-gray-600 text-sm">Booking on {slotDateFormat(items.slotDate)}</p>
                </div>
                {items.cancelled ? (
                  <p className="text-sx font-medium text-red-500">Cancelled</p>
                ) : (
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
      </div>
    )
  );
};

export default Dashboard;
