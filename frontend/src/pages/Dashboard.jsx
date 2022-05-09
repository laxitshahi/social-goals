import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import { getGoals, reset } from "../features/goals/goalSlice";
// import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Goal from "../components/Goal";
import { toast } from "react-toastify";

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
    <>
      <section className="my-10 capitalize">
        <h1 className="flex justify-center my-10 text-2xl font-extrabold ">
          Dashboard
        </h1>
        <h1 className="flex justify-center my-2">
          Welcome {user && user.name}!
        </h1>
        {/* If user exists (then)=> show user.name*/}
        <GoalForm />
      </section>

      <div className=""></div>

      <section className="flex justify-center">
        {goals.length > 0 ? (
          <div className="grid grid-cols-2">
            {/* Add feature to allow for different row placement*/}
            {goals.map((goal) => (
              <Goal key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have no Goals.</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
