import axios from "axios";

const API_URL = "/api/users/"; // The 1st part of this, 'localhost:3011', is located in the frontend package.json as 'proxy:'

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    //axios automatically stores data in .data
    localStorage.setItem("user", JSON.stringify(response.data)); //this includes our user token

    /*Note it is not best practice to store jwt in localStorage
        - This is because dat in the localStorage is vulnerable to xss (cross site scripting) attacks 
    */
  }

  return response.data;
};

//Logout user
const logout = async () => {
  localStorage.removeItem("user");
  //This is a very simple approach
  //You can also try using the server and send a http cookie
};

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
