import { useEffect, useState } from "react";
import PropTypes from "prop-types";
/*External Tools*/
import { toast } from "react-toastify";
import { getGlobalGoals, reset } from "../features/global/globalSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

  if (filteredGoals.length <= 0) {
    return <h3>There no Goals available</h3>;
  }

  let sortedGoals = [...filteredGoals].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      {sortedGoals.map((goal) => (
        <Goal deleteDisabled={true} key={goal._id} goal={goal} />
      ))}
    </div>
  );
};
RenderGoals.propTypes = {
  goals: PropTypes.array,
  search: PropTypes.string,
};

function Global() {
  const { user } = useSelector((state) => state.auth);
  const { globalGoals, isLoading, isError, message } = useSelector(
    (state) => state.global
  );
  const [quote, setQuote] = useState({ quote: "loading", author: null });
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

      setQuote({
        quote: data.contents.quotes[0].quote,
        author: data.contents.quotes[0].author,
      });
    })();
  }, [quote]);

  const onChange = (e) => {
    const lowerCase = e.target.value.toLowerCase();

    setSearch(lowerCase);
  };
  if (isLoading) {
    <Spinner />;
  } else {
    return (
      <>
        <section className="my-10 capitalize">
          <h1 className="flex justify-center my-10 text-2xl font-extrabold ">
            Global
          </h1>
          <div className="flex justify-center px-8 my-6 ">
            <FaQuoteLeft />
            <div className="italic">
              <Code>{quote.quote}</Code>
              <span className="flex justify-end text-sm font-bold ">
                {" "}
                - {quote.author}
              </span>
            </div>

            <FaQuoteRight />
          </div>
          {/* If user exists (then)=> show user.name*/}
          {/* <GoalForm submitText="Search" /> */}

          <div className="flex justify-center max-w-5xl px-4 mx-auto rounded">
            <Input onChange={onChange} placeholder="Search Goal..." />
          </div>
        </section>
        {/* Add modal?i */}
        <section className="flex justify-center mx-4 ">
          {/* 2 or less goals */}
          <RenderGoals goals={globalGoals} search={search} />
        </section>
      </>
    );
  }
}

export default Global;
