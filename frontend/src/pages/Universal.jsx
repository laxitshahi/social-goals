import { useEffect, useState } from "react";
import PropTypes from "prop-types";
/*External Tools*/
import { toast } from "react-toastify";
import { getGlobalGoals, reset } from "../features/goals/goalSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/*Component Import*/
import { Spinner, Goal } from "../components";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Input, Code } from "@chakra-ui/react";
const RenderGoals = ({ goals, search }) => {
  const filteredGoals = goals.filter((goal) => {
    if (search === "") {
      return goal;
    } else {
      return goal.text.toLowerCase().includes(search);
    }
  });

  if (filteredGoals.length > 0 && filteredGoals.length < 3) {
    return (
      <div className="grid grid-cols-2">
        {/* Add feature to allow for different row placement*/}
        {filteredGoals.map((goal) => (
          <Goal key={goal._id} goal={goal} />
        ))}
      </div>
    );
  } else if (filteredGoals.length >= 3 && filteredGoals.length <= 12) {
    return (
      <div className="grid grid-cols-3">
        {/* Add feature to allow for different row placement*/}
        {filteredGoals.map((goal) => (
          <Goal key={goal._id} goal={goal} />
        ))}
      </div>
    );
  } else {
    return <h3>You have no Goals.</h3>;
  }
};
RenderGoals.propTypes = {
  goals: PropTypes.array,
  search: PropTypes.string,
};

function Universal() {
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const [quote, setQuote] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get Goals
  useEffect(() => {
    if (isError) {
      //Fix hard coded error work around
      if (message === "Cannot read properties of null (reading 'token')") {
        console.log("Cannot read properties of null (reading 'token')");
      } else {
        toast.error(message);
      }
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getGlobalGoals()); //fetch and store goals in goals state
    return () => {
      //When component umounts remove goals
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);

  //Get Daily Quote
  useEffect(() => {
    let data;
    (async () => {
      const response = await fetch(
        "https://quotes.rest/qod.json?category=inspire"
      );
      data = await response.json();
      setQuote(data.contents.quotes[0].quote);
    })();
  }, [quote]);

  const onChange = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    setSearch(lowerCase);
  };
  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <section className="my-10 capitalize">
        <h1 className="flex justify-center my-10 text-2xl font-extrabold ">
          Universal
        </h1>
        <h1 className="flex justify-center gap-3 my-6 ">
          <FaQuoteLeft />
          <Code className="italic">{quote}</Code>
          <FaQuoteRight />
        </h1>
        {/* If user exists (then)=> show user.name*/}
        {/* <GoalForm submitText="Search" /> */}

        <div className="flex justify-center flex-shrink rounded mx-60">
          <Input onChange={onChange} placeholder="Search Goal..." />
        </div>
      </section>
      {/* Add modal?i */}
      <section className="flex justify-center">
        {/* 2 or less goals */}
        <RenderGoals goals={goals} search={search} />
      </section>
    </>
  );
}

export default Universal;
