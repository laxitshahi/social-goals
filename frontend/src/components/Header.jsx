/* eslint-disable */
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
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
    <header className="header">
      <div className="logo">
        <Link to="/">Goal Setter</Link>
      </div>
      <ul>
        {user ? ( //Change Header based on if user is logged in or out
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
export default Header;
