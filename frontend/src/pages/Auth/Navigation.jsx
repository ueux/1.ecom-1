import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../../redux/api/useraApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toogleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toogleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{ zIndex: 999 }}
      id="navigation-container"
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex item-center transition-transform transform hover:translate-x-2 "
        >
          <AiOutlineHome size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        <Link
          to="/shop"
          className="flex item-center transition-transform transform hover:translate-x-2 "
        >
          <AiOutlineShopping size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>
        <Link
          to="/cart"
          className="flex item-center transition-transform transform hover:translate-x-2 "
        >
          <AiOutlineShoppingCart size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
        </Link>
        <Link
          to="/favorite"
          className="flex item-center transition-transform transform hover:translate-x-2 "
        >
          <FaHeart size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span>{" "}
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toogleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white ">{userInfo.data.user.username}</span>
          ) : (
            ""
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute  mt-2 right-7 space-y-1 bg-black text-gray-600 ${
              !userInfo.data.user.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.data.user.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
             <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
