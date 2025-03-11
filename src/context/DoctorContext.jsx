import React, { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState([]);
  const [profile,setProfile] = useState([])
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  const months = [
    "",
    "JAN",
    "FEB",
    "MARCH",
    "APRIL",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const appointmentdoctors = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/doctor/appointments`,
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        setAppointments(data.appointments);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/doctor/appointment-complete`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        appointmentdoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/doctor/appointment-cancel`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        appointmentdoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const doctorDashboard = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/doctor/dashboard`, {
        headers: { dToken },
      });
      if (data.success) {
        toast.success(data.message);
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/doctor/profile`, {
        headers: { dToken },
      });
      if (data.success) {
        setProfile(data.profile)
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const value = {
    backendUrl,
    dToken,
    setDToken,
    appointments,
    setAppointments,
    appointmentdoctors,
    calculateAge,
    slotDateFormat,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    doctorDashboard,
    profile,setProfile,
    getProfile,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
