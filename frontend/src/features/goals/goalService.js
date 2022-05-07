import axios from "axios";

const API_URL = "/api/goals/";

//Post Goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

//Get Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (token) {
    const res = await axios.get(API_URL, config);

    return res.data;
  } else {
    return;
  }
};

//Delete Goal
const deleteGoal = async (goalID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL + goalID, config);
  return res.data;
};
//Update Goal

const goalService = {
  getGoals,
  createGoal,
  deleteGoal,
};

export default goalService;
