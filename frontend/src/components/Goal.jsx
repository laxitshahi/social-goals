/* eslint-disable react/prop-types */
//Look into how to declare prop-types
// eslint-disable-next-line no-unused-vars
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function Goals({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <button onClick={() => console.log("here")} className="edit">
        <FaEdit />
      </button>
      <h4>{goal.text}</h4>
      <h5>{new Date(goal.createdAt).toLocaleString("en-US")}</h5>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
    </div>
  );
}

export default Goals;
