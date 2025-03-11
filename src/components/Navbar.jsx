import React, { useContext } from 'react'
import { assets } from "../assets/assets.js"
import { AdminContext } from '../context/AdminContext.jsx'
import {useNavigate} from "react-router-dom"
import { DoctorContext } from '../context/DoctorContext.jsx'

const Navbar = () => {
    const {aToken,setAToken} = useContext(AdminContext)
    const {dToken,setDToken} = useContext(DoctorContext)
    const navigate = useNavigate()
    const logout =()=>{
        navigate("/")
    aToken && setAToken('')
    aToken && setAToken(localStorage.removeItem('aToken'))
    dToken && setDToken('')
    dToken && setDToken(localStorage.removeItem('dToken'))
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs' >
            <img className='w-40' src={assets.appointo} />
            <p className='text-gray-600 border rounded-full px-2.5 py-0.5 border-gray-500' >{ aToken ? "Admin" :"Doctor" }</p>
        </div>
        <button className='bg-indigo-500 px-10 py-2 rounded-full text-white cursor-pointer' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar