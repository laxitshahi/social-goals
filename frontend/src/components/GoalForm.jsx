import { useState } from "react";
import PropTypes from "prop-types";
import { createGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";
import {
  // Select,
  Stack,
  Textarea,
  useToast,
  Select,
} from "@chakra-ui/react";

import { FaCog } from "react-icons/fa";
function GoalForm({ submitText }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const toast = useToast();
  const id = "test-toast";
  const onSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      text: text,
      category: category,
      type: type,
    };
    /**
     * Create Goal if all data inputs exist
     * else => return error
     */

    if (goalData.text.length <= 69) {
      if (goalData.text && goalData.category && goalData.type) {
        dispatch(createGoal(goalData));
      } else {
        /**
         * Remove duplicate errors
         */
        if (!toast.isActive(id)) {
          toast({
            id,
            title: "Error",
            position: "top-right",
            description: "Inputs missing.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      }
      setText("");
    } else {
      toast({
        id,
        title: "Error",
        position: "top-right",
        description: "Too many characters",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <section className="formCard">
      <form>
        <div className="gap-7 formInput">
          <Textarea
            width="auto"
            height="auto"
            type="text"
            name="text"
            id="goal"
            placeholder="Goal..."
            value={text}
            onChange={(e) => {
              setText(e.target.value); //e is this object object value of the input --> you get the value typed and set it to the "text" state
            }}
          ></Textarea>
          <Stack>
            {/**
             * Update To MENU UI
             */}
            <Select
              placeholder="Select Category"
              variant="filled"
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="relationship">Relationship</option>
              <option value="health">Health</option>
              <option value="career">Career</option>
              <option value="finance">Finance</option>
              <option value="recreation">Recreation</option>
            </Select>

            <Select
              placeholder="Select Type"
              variant="filled"
              id="type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="global">Global</option>
              <option value="local">Local</option>
            </Select>

            <div className="flex gap-2 ">
              <button onClick={onSubmit} className="px-16 formButton">
                {submitText}
              </button>
              <button className="px-2 formButton ">
                <FaCog />
              </button>
            </div>
          </Stack>
        </div>
        <div className="flex gap-4 px-6 justify-items-"></div>
      </form>
    </section>
  );
}
GoalForm.propTypes = {
  submitText: PropTypes.string,
};

export default GoalForm;
