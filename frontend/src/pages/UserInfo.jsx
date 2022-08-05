import { useState, useEffect } from "react";

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGlobalGoals, reset } from "../features/goals/goalSlice";
import { Spinner } from "../components";

function UserInfo() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.global);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toast = useToast();
  //Get Goals
  useEffect(() => {
    console.log("here");
    if (isError) {
      //Fix hard coded error work around
      if (message === "Cannot read properties of null (reading 'token')") {
        console.log("Cannot read properties of null (reading 'token')");
      } else {
        toast.error(message);
      }
    }
    console.log("here");
    if (!user) {
      navigate("/login");
    }

    dispatch(getGlobalGoals()); //fetch and store goals in goals state
    return () => {
      //When component umounts remove goals
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate, toast]);

  let toastID = 0;
  const [currCount, setCurrCount] = useState("Daily");

  //Mock Data
  let goalCount = [
    { Daily: 4 },
    { Weekly: 7 },
    { Monthly: 25 },
    { Yearly: 114 },
  ];

  let goalCounts = {
    Daily: [4, 0, 3.01, 0],
    Weekly: [7, 3, 10.15, 5.05],
    Monthly: [25, 15, 11.33, 23.58],
    Yearly: [114, 78, 23.26, 63.58],
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="my-10 capitalize">
      <h2 className="flex justify-center font-bold">Your Information </h2>

      {/* Start of Tab Content */}
      <Tabs className="flex justify-center max-w-4xl mx-auto ">
        <TabList>
          <Tab>General</Tab>
          <Tab>Goals</Tab>
        </TabList>

        <TabPanels>
          {/* General Panel */}
          <TabPanel>
            <div className="grid mx-10 border-2 shadow-xl ">
              <div className="grid p-4 md:p-20 gap-y-2 min-w-sm">
                <h3 className="flex justify-center italic">
                  This Feature is currently in Progress
                </h3>
                <InputGroup>
                  <InputLeftAddon>Name: </InputLeftAddon>
                  <Input type="name" placeholder={user.name} />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon>Email: </InputLeftAddon>
                  <Input type="email" placeholder={user.email} />
                </InputGroup>

                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => {
                      toastID += 1;
                      toast({
                        toastID,
                        title: "Error",
                        position: "top-right",
                        description: "Feature in progress!",
                        status: "warning",
                        duration: 2000,
                        isClosable: true,
                      });
                    }}
                    className="p-2 formButton"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* Goals Panel */}
          <TabPanel>
            <div className="grid mx-10 border-2 shadow-xl ">
              <div className="grid p-4 md:p-10 gap-y-8 min-w-sm">
                <h3 className="flex justify-center italic">
                  This Feature is currently in Progress
                </h3>

                <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 ">
                  <Stat>
                    <StatLabel className="">Total # of Goals </StatLabel>
                    <StatNumber className="flex text-center">124</StatNumber>
                    <StatHelpText>Feb 01 - Aug 31</StatHelpText>
                  </Stat>

                  <select
                    onChange={(e) => {
                      setCurrCount(e.target.value);
                    }}
                    value={currCount}
                  >
                    {goalCount.map((time) => {
                      const count = Object.keys(time)[0];
                      return (
                        <option
                          className="capitalize"
                          key={count}
                          value={count}
                        >
                          {count}
                        </option>
                      );
                    })}
                  </select>
                  <Stat className="flex justify-center">
                    <StatLabel>Goals Added </StatLabel>
                    <StatNumber className="flex text-center">
                      {goalCounts[currCount][0]}{" "}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      {`${goalCounts[currCount][2]}%`}
                    </StatHelpText>
                  </Stat>

                  <Stat className="flex justify-center">
                    <StatLabel>Goals Completed </StatLabel>
                    <StatNumber className="flex text-center">
                      {goalCounts[currCount][1]}{" "}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      {`${goalCounts[currCount][3]}%`}
                    </StatHelpText>
                  </Stat>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default UserInfo;
