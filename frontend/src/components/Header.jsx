/* eslint-disable */
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaRegStickyNote,
  FaCogs,
} from "react-icons/fa";
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
    <nav className="sticky flex flex-wrap items-center justify-between p-6 border-b rounded shadow-md ">
      <div className="flex items-center flex-shrink-0 mr-6 text-white">
        <FaRegStickyNote />
        <div className="flex items-center flex-shrink-0 line-through rounded font- ">
          <Link to="/">Goal Setter</Link>
        </div>
      </div>

      {user ? ( //Change Header based on if user is logged in or out
        <div className="top-0 flex justify-end stick">
          <button className="headerButton">
            <FaUser />
            Profile
          </button>
          <button className="headerButton" onClick={onLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      ) : (
        <>
          <div className="top-0 flex justify-end stick">
            <button className="headerButton">
              <FaSignInAlt /> <Link to="/login">Login</Link>
            </button>

            <button className="headerButton">
              <FaUser /> <Link to="/register">Register</Link>
            </button>
          </div>
        </>
      )}
    </nav>
  );
}
export default Header;
