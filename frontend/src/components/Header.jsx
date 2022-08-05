import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaStickyNote,
} from "react-icons/fa";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout()); //removes 'user' from local storage
    dispatch(reset()); //resets all values in 'user' global state to default
    navigate("/login"); //navigates page to dashboard
  };

  return (
    <nav className="sticky flex justify-between p-2 space-x-4 text-xs border-b rounded shadow-md sm:p-4 sm:text-base">
      <div className="flex items-center text-white ">
        <div className="flex items-center justify-center px-1 mr-3 rounded bg-background text-tertiary gap-x-1">
          <FaStickyNote />
          {/* Social + Goal */} <p className="">Soci-al</p>
        </div>

        {user ? (
          <>
            <div className="flex items-center rounded hover:line-through ">
              <Link to="/">Dashboard</Link>
            </div>
            <div className="flex items-center ml-4 rounded hover:line-through ">
              <Link to="/global">Global</Link>
            </div>
            <div className="flex items-center ml-4 rounded hover:line-through ">
              <Link to="/data">Data</Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {user ? ( //Change Header based on if user is logged in or out
        <div className="flex items-center space-x-3">
          <Popover className="bg-[#ffffff]">
            <PopoverTrigger>
              <button
                colorScheme="white"
                className="flex items-center justify-center space-x-1 font-bold"
              >
                <FaUser />
                <span className="capitalize text-button">{user.name}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader className="flex justify-center font-bold">
                Hello {user.name}!
              </PopoverHeader>
              <PopoverBody>
                <ol className="grid gap-y-2">
                  <li>
                    <Link to="/userinfo" className="formButton">
                      User Information
                    </Link>
                  </li>
                  <li>
                    <button className="formButton" onClick={onLogout}>
                      <div className="flex items-center justify-center space-x-2">
                        <span>Logout</span>
                        <FaSignOutAlt />
                      </div>
                    </button>
                  </li>
                </ol>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <>
          <div className="top-0 flex justify-end space-x-2 font-bold ">
            <button className="flex items-center space-x-1">
              <FaSignInAlt />{" "}
              <Link className="font-bold" to="/login">
                Login
              </Link>
            </button>

            <button className="flex items-center space-x-1">
              <FaUser />{" "}
              <Link className="font-bold" to="/register">
                Register
              </Link>
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
export default Header;
