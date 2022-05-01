import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import { toast } from "react-toastify";
// import Spinner from "../components/Spinner";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  // if (isLoading) {
  //   <Spinner />;
  // }
  return (
    <div>
      Dashboard
      <div> </div>
    </div>
  );
}

export default Dashboard;
