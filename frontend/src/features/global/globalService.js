/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "/api/goals/";
//Get Global Goals
const getGlobalGoals = async () => {
  const res = await axios.get(API_URL + "global");
  return res.data;
};

// //Delete Goal
// const deleteGoal = async (goalID, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const res = await axios.delete(API_URL + goalID, config);
//   return res.data;
// };

const globalService = {
  getGlobalGoals,
};
export default globalService;
