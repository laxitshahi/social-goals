// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import PropTypes from "prop-types";

import { FaEdit, FaRegHandPointRight, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";

import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";

function Goals({ goal, deleteDisabled }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(goal.text);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: goal._id,
      text: { text }, // it is passed in as an object, so you need to destructure the text here..? why
    };
    dispatch(updateGoal(data));
    setEdit(false);
  };

  return (
    <div className="relative p-4 m-2 border rounded-xl bg-opacity-40 bg-paragraph">
      {/* Add ability to change goal color */}

      {deleteDisabled ? (
        <div>
          <button
            onClick={() => console.log("hello")}
            className="absolute hover top-1 right-4"
          >
            <FaRegHeart />
          </button>
        </div>
      ) : (
        <div>
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
        </div>
      )}

      {edit ? (
        <section className="px-1 py-2 formCard ">
          <form onSubmit={onSubmit}>
            <div className="flex justify-center pb-2 ">
              <input
                type="text"
                name="text"
                id="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value); //e is this object object value of the input --> you get the value typed and set it to the "text" state
                }}
              ></input>
            </div>
            <button className="px-20 formButton">Update</button>
          </form>
        </section>
      ) : (
        <h4 className="my-2 break-words">{goal.text}</h4>
      )}
      <h5 className="mb-2 text-xs capitalize">
        <Tag borderRadius="full" size={"xs"}>
          <TagLeftIcon boxSize="12px" as={FaRegHandPointRight} />
          <TagLabel> {goal.category}</TagLabel>
        </Tag>{" "}
        <Tag borderRadius="full" size={"xs"}>
          <TagLeftIcon boxSize="12px" as={FaRegHandPointRight} />
          <TagLabel> {goal.type}</TagLabel>
        </Tag>
      </h5>

      <h5 className="text-xs font-extralight">
        {new Date(goal.createdAt).toLocaleString("en-US")}
      </h5>
    </div>
  );
}

Goals.propTypes = {
  goal: PropTypes.object,
  deleteDisabled: PropTypes.bool,
};

export default Goals;
