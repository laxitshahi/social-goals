import axios from "axios";

const API_URL = "/api/goals/";

//Get Goals
const getGoals = async (goals) => {
  const res = await axios.get(API_URL);
  if (res.data) {
    localStorage.setItem("goals", JSON.stringify(res.data));
  }

  return res.data;
};
//Post Goal

//Update Goal

//Delete Goal

const goalService = {
  getGoals,
};

export default goalService;
