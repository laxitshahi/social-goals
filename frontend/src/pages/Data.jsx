import { useState, useEffect } from "react";
import { PieChart, BarChart } from "../components";
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
    <>
      <section className="my-10 capitalize ">
        <h1 className="flex justify-center my-10 text-2xl font-extrabold ">
          Data
        </h1>

        <div className="grid grid-cols-1 gap-y-8 md:gap-y-0 justify-evenly md:grid-cols-2 ">
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

          <div className="relative p-6 mr-2 border-2 lg:m-16 md:m-10">
            <Tooltip label="Data is currently rendered based on previous page visisted Dashboard (Local Goals), Global (Global Goals).">
              <span className="absolute right-1 text top-1 ">
                <FaInfoCircle />
              </span>
            </Tooltip>
            {/* Graphs */}
            <div className="flex flex-col space-y-5 md:space-y-0 ">
              <div className="border hover bg-[#ffffff]">
                <PieChart chartData={userData} />
              </div>

              <div className="border hover">
                <BarChart chartData={userData} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Data;
