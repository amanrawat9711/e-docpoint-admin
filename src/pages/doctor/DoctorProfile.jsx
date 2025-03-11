import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

const DoctorProfile = () => {
  const { profile, setProfile, getProfile, dToken,backendUrl } = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profile.address,
        fees: profile.fees,
        available: profile.available,
      };
      const {data} = await axios.post(backendUrl+`/api/doctor/update-profile`,updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
getProfile()
      }else{
toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken]);
  return (
    getProfile &&
    Object.keys(profile).length > 0 && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-indigo-500/80 sm:max-w-60 rounded-lg"
              src={profile.image}
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 font-medium text-3xl text-gray-700">
              {profile.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profile.degree}-{profile.speciality}
              </p>
              <button className="cursor-pointer py-0.5 px-2 border text-xs rounded-full">
                {profile.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center text-gray-800 font-medium text-sm gap-1 mt-3">
                About:
              </p>
              <p className="text-md mt-1 max-w-[700px] text-gray-600">
                {profile.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment Fees:<span className="text-gray-800">$</span>
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, fees: e.target.value }))
                  }
                  value={profile.fees}
                />
              ) : (
                profile.fees
              )}
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm ">
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profile.address.line1}
                  />
                ) : (
                  profile.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profile.address.line2}
                  />
                ) : (
                  profile.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfile((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                className="accent-indigo-500"
                checked={profile.available}
                type="checkbox"
              />
              <label htmlFor="">Available</label>
            </div>
            {isEdit ? (
              <button
                className="cursor-pointer border border-indigo-600 text-sm rounded-full mt-5 py-1 px-5 hover:bg-indigo-500 hover:text-white transition-all"
                onClick={updateProfile}
              >
                Save
              </button>
            ) : (
              <button
                className="cursor-pointer border border-indigo-600 text-sm rounded-full mt-5 py-1 px-5 hover:bg-indigo-500 hover:text-white transition-all"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
