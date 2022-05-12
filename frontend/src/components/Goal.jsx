/* eslint-disable react/prop-types */
//Look into how to declare prop-types
// eslint-disable-next-line no-unused-vars
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";
import { useState } from "react";
function Goals({ goal }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [text, settext] = useState(goal.text);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: goal._id,
      text: { text },
    };
    dispatch(updateGoal(data));
    setEdit(false);
  };

  return (
    <div className="relative p-4 m-2 border rounded bg-opacity-40 bg-paragraph">
      {/* Add ability to change goal color */}
      <button
        onClick={() => setEdit(!edit)}
        className="absolute hover top-1 left-4"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => dispatch(deleteGoal(goal._id))}
        className="absolute hover top-1 right-4"
      >
        X
      </button>

      {edit ? (
        <section className="px-1 py-2 formCard">
          <form onSubmit={onSubmit}>
            <div className="flex justify-center pb-2 ">
              <input
                type="text"
                name="text"
                id="text"
                value={text}
                onChange={(e) => {
                  settext(e.target.value); //e is this object object value of the input --> you get the value typed and set it to the "text" state
                }}
              ></input>
            </div>
            <button className="px-20 formButton">Update</button>
          </form>
        </section>
      ) : (
        <h4 className="my-2 break-words">{goal.text}</h4>
      )}
      <h5>{new Date(goal.createdAt).toLocaleString("en-US")}</h5>
    </div>
  );
}

export default Goals;
