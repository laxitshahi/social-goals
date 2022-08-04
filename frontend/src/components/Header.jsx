import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaStickyNote,
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
    <nav className="sticky flex justify-between p-6 space-x-4 border-b rounded shadow-md">
      <div className="flex items-center flex-shrink-0 text-white ">
        <div className="flex items-center justify-center p-1 mr-4 rounded bg-background hover:linethrough text-tertiary gap-x-1">
          <FaStickyNote />
          {/* Goal in Luxembourgish*/} <p className="">Zil</p>
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
        <div className="flex items-center space-x-2">
          <button className="">
            <FaUser />
          </button>
          <button className="" onClick={onLogout}>
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
