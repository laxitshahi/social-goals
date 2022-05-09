import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// useSelector: Used to selected something from the state
// useDispatch: Used to dispatch the functions, ex. reset function (Vue mutations?)

import { useNavigate } from "react-router-dom"; //used to redirect (rerender?)
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, //get the key:value of the previous states

      [e.target.name]: e.target.value, //key: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    <Spinner />;
  }
  return (
    <div className="formBorder">
      <section className="flex items-center justify-center flex-shrink px-2 rounded">
        <FaUser />
        <h1>Create an Account</h1>
      </section>

      <section className="formCard">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="formInput"
            id="name"
            name="name"
            value={name}
            placeholder="Username"
            onChange={onChange}
          />

          <input
            type="email"
            className="formInput"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onChange}
          />

          <input
            type="password"
            className="formInput"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChange}
          />

          <input
            type="password"
            id="password2"
            className="formInput"
            name="password2"
            value={password2}
            placeholder="Confirm Password"
            onChange={onChange}
          />

          <button type="submit" className="formButton" onSubmit={onSubmit}>
            Create
          </button>
        </form>
      </section>
    </div>
  );
}
export default Register;
