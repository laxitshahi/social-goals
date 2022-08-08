import { useState, useEffect } from "react";
import { PieChart } from "../components";
import { useToast, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGlobalGoals, reset } from "../features/goals/goalSlice";
import { Spinner, Goal } from "../components";

import { FaInfoCircle } from "react-icons/fa";
function Data() {
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  const toast = useToast();
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

    dispatch(getGlobalGoals()); //fetch and store goals in goals state

    return () => {
      //When component umounts remove goals
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate, toast]);

  const labels = ["Relationship", "Health", "Career", "Finance", "Recreation"];

  const data = [];
  const numOf = (goals, category) => {
    const lowerCaseCat = category.toLowerCase();
    const result = goals.filter((goal) => goal.category === lowerCaseCat);
    return result.length;
  };

  for (let i = 0; i < labels.length; i++) {
    data.push(numOf(goals, labels[i]));
  }

  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({
    labels: labels,
    datasets: [
      {
        data: data,
        label: ["Categories"],
        backgroundColor: [
          "rgba(255, 100, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        // broderColor: "black",
        // borderWidth: 1,
      },
    ],
  });

  if (isLoading) {
    <Spinner />;
  }

  return (
    <section className="my-10 capitalize ">
      <h1 className="flex items-center justify-center my-10 space-x-2 text-2xl font-extrabold ">
        <p>Data</p>
        <Tooltip label="This page contains data for the most recent goals added. Additionally, graphs and charts can also present to help visualize the data.">
          <span>
            <FaInfoCircle className="text-xl" />
          </span>
        </Tooltip>
      </h1>

      <div className="flex flex-col-reverse gap-y-8 md:gap-y-0 lg:grid lg:grid-cols-2 ">
        {/* Recent Goals */}
        <div className="flex flex-col mx-auto lg:m-8">
          <h2 className="flex justify-center font-bold">Recent Goals</h2>
          <ol>
            {goals
              .slice(-5)
              .reverse()
              .map((goal) => {
                return (
                  <li key={goal._id}>
                    <Goal deleteDisabled={true} key={goal._id} goal={goal} />
                  </li>
                );
              })}
          </ol>
        </div>

        <div className="relative mr-2 md:m-8">
          <h3 className="flex justify-center space-x-2 font-bold">
            <Tooltip label="Data is (currently) rendered based on the previous page visited: Dashboard (Local Goals), Global (Global Goals).">
              <span className="text-xl ">
                <FaInfoCircle />
              </span>
            </Tooltip>
            <p>Distribution of Categories</p>
          </h3>

          {/* Graphs */}
          <div className="flex flex-col space-y-5 md:space-y-0 ">
            <div className="pb-10 border-2 rounded-3xl">
              <div className="hover grid pt-5 bg-[#ffffff]">
                <PieChart chartData={userData} />
              </div>
            </div>

            {/* <div className="border hover">
              <BarChart chartData={userData} />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Data;
