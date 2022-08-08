import { useEffect } from "react";
import PropTypes from "prop-types";
/*External Tools*/
import { toast } from "react-toastify";
import { getGoals, reset } from "../features/goals/goalSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/*Component Import*/
import { GoalForm, Spinner, Goal } from "../components";
import { FaInfoCircle } from "react-icons/fa";

import { Tooltip } from "@chakra-ui/react";

const RenderGoals = ({ goals }) => {
  if (goals.length === 0) {
    return <h3>You have no Goals.</h3>;
  }

  let sortedGoals = [...goals].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      {/* Add feature to allow for different row placement*/}
      {sortedGoals.map((goal) => (
        <Goal deleteDisabled={false} key={goal._id} goal={goal} />
      ))}
    </div>
  );
};
RenderGoals.propTypes = {
  goals: PropTypes.array,
};

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    dispatch(getGoals()); //fetch and store goals in goals state

    return () => {
      //When component umounts remove goals
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) {
    <Spinner />;
  }
  return (
    <div>
      <section className="my-10 capitalize">
        <h1 className="flex items-center justify-center my-10 space-x-2 text-2xl font-extrabold ">
          <span>Dashboard</span>
          <Tooltip label="This page is for your eyes only! Here, you can add, edit, or delete your local and global goals.">
            <span className="text-xl">
              <FaInfoCircle />
            </span>
          </Tooltip>
        </h1>

        <h1 className="flex justify-center my-2">
          Welcome {user && user.name}!
        </h1>
        {/* If user exists (then)=> show user.name*/}
        <GoalForm submitText="Add Goal" />
      </section>
      {/* Add modal?i */}
      <section className="flex justify-center">
        {/* 2 or less goals */}
        <RenderGoals goals={goals} />
      </section>
    </div>
  );
}

export default Dashboard;
