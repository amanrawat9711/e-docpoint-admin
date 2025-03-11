import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const{setDToken} = useContext(DoctorContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
            localStorage.setItem('aToken',data.token)
          setAToken(data.token);
        toast.success("Login Successful");
        }
        else{
        toast.error(data.message)
          
        }
      } else {
        const {data} = await axios.post(backendUrl+'/api/doctor/login',{email,password})
        if(data.success){
          localStorage.setItem('dToken',data.token)
          setDToken(data.token)
          toast.success("Login Successfully")
        }
      }
    } catch (error) {
        toast.error(error.message);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-4 m-auto p-8 items-start min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-md shadow-lg">
        <p className="text-xl font-semibold m-auto">
          <span className="text-indigo-500">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value = { email }
            className="w-full border border-[#DADADA] rounded p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value = { password }
            className="w-full border border-[#DADADA] rounded p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="cursor-pointer bg-indigo-500 text-white py-3 border rounded-md w-full">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            {" "}
            Doctor Login?
            <span
              className="cursor-pointer text-indigo-600 underline"
              onClick={() => setState("Doctor")}
            >
              Click here!
            </span>
          </p>
        ) : (
          <p>
            Admin Login?
            <span
              className="cursor-pointer text-indigo-600 underline"
              onClick={() => setState("Admin")}
            >
              Click here!
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
