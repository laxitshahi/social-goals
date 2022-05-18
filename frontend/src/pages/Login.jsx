/* eslint-disable */
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// useSelector: Used to selected something from the state
// useDispatch: Used to dispatch the functions, ex. reset function (Vue mutations?)

import { useNavigate } from "react-router-dom"; //used to redirect (rerender?)
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import FormCard from "../components/FormCard";
function Login() {
  const [formData, setFormData] = useState({
    email: "laxit@gmail.com",
    password: "password",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth //Takes in function where we specify the states we are getting the data from (in store.js)
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch, message]); //watches for changes in any of these dependencies

  //
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, //get the key:value of the previous states

      [e.target.name]: e.target.value, //key: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="formBorder">
      <section className="flex items-center justify-center flex-shrink pb-2 font-bold rounded">
        Welcome Back!
      </section>

      <section className="formCard">
        <form onSubmit={onSubmit}>
          <div className="formInput">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="formInput">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="formButton" onSubmit={onSubmit}>
            /Login
          </button>
        </form>
      </section>
    </div>
  );
}
export default Login;
