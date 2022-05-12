import { useState } from "react";
import { createGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";

function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text })); //you must

    setText("");
  };

  return (
    <section className="formCard">
      <form onSubmit={onSubmit}>
        <div className="formInput">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Goal..."
            value={text}
            onChange={(e) => {
              setText(e.target.value); //e is this object object value of the input --> you get the value typed and set it to the "text" state
            }}
          ></input>
        </div>
        <button className="formButton">Add Goal </button>
      </form>
    </section>
  );
}

export default GoalForm;
