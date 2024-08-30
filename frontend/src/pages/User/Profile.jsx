import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: loadingUadateProfile }] =
    useProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    setUsername(userInfo.data.user.username);
    setEmail(userInfo.data.user.email);
  }, [userInfo.data.user.username, userInfo.data.user.email]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo.data.user._id,
        username,
        email,
      }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success("Profile Updated Succesfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div className="container mx-auto p-4 mt-[2rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl text-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem] ">
              <lable
                htmlFor="email"
                className="text-white block text-sm font-medium "
              >
                Email Address
              </lable>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem] ">
              <lable
                htmlFor="username"
                className="text-white block text-sm font-medium "
              >
                Username
              </lable>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 border rounded w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-black py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>
              <Link
                to={"/user-orders"}
                className="bg-pink-500 text-black py-2 px-4 rounded hover:bg-pink-600"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUadateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
