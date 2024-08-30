import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { usePasswordMutation, useProfileMutation } from "../../redux/api/useraApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [updateProfile, { isLoading:loadingUadateProfile }] = usePasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const submitHandler = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Password do not match')
    }
    else {
      try {
        const res = await updateProfile({ _id: userInfo.data.user._id, newPassword,oldPassword,confirmPassword }).unwrap()
        dispatch(setCredientials({ ...res }))
        toast.success('Password Updated Succesfully')
      } catch (error) {
toast.error(error?.data?.message || error.message)
      }
    }
  }
  return (
    <div className="container mx-auto p-4 mt-[2rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
        <h2 className="text-2xl text-semibold mb-4">Update Profile</h2>
        <form onSubmit={submitHandler}  className="container w-[40rem]">

            <div className="my-[2rem] ">
                        <lable htmlFor="oldPassword" className="text-black block text-sm font-medium ">
                            Old Password
                        </lable>
                        <input type="password" id="oldPassword" className="mt-1 p-2 border rounded w-full" value={oldPassword}  onChange={(e)=>setOldPassword(e.target.value)}/>
                    </div>
                    <div className="my-[2rem] ">
                        <lable htmlFor="newPassword" className="text-black block text-sm font-medium ">
                            New Password
                        </lable>
                        <input type="password" id="newPassword" className="mt-1 p-2 border rounded w-full" value={newPassword}  onChange={(e)=>setNewPassword(e.target.value)}/>
                      </div>
                      <div className="my-[2rem] ">
                        <lable htmlFor="confirmPassword" className="text-black block text-sm font-medium ">
                            Confirm Password
                        </lable>
                        <input type="password" id="confirmPassword" className="mt-1 p-2 border rounded w-full" value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-pink-500 text-black py-2 px-4 rounded hover:bg-pink-600">
                Update
              </button>
            </div>
                </form>
        </div>
        {loadingUadateProfile&& <Loader/>}
      </div>
    </div>
  )
}

export default Profile
