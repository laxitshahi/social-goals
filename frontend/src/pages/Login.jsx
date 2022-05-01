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
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Log in
        </h1>
        <p>Input details below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block" onSubmit={onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
export default Login;
