/* eslint-disable react/prop-types */
//Look into how to declare prop-types
// eslint-disable-next-line no-unused-vars
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function Goals({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="relative p-4 m-2 border rounded  hover bg-opacity-40 bg-tertiary">
      {/* Add ability to change goal color */}
      <button
        onClick={() => console.log("here")}
        className="absolute top-1 left-1"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => dispatch(deleteGoal(goal._id))}
        className="absolute top-1 right-1"
      >
        X
      </button>
      <h4 className="my-2 break-words">{goal.text}</h4>
      <h5>{new Date(goal.createdAt).toLocaleString("en-US")}</h5>
    </div>
  );
}

export default Goals;
