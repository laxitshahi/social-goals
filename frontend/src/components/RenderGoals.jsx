import PropTypes from "prop-types";
import { Goal } from "../components";
function RenderGoals({ goals }) {
  if (goals.length > 0 && goals.length < 3) {
    return (
      <div className="grid grid-cols-2">
        {/* Add feature to allow for different row placement*/}
        {goals.map((goal) => (
          <Goal deleteDisabled={false} key={goal._id} goal={goal} />
        ))}
      </div>
    );
  } else if (goals.length >= 3 && goals.length <= 12) {
    return (
      <div className="grid grid-cols-3">
        {/* Add feature to allow for different row placement*/}
        {goals.map((goal) => (
          <Goal deleteDisabled={false} key={goal._id} goal={goal} />
        ))}
      </div>
    );
  } else {
    return <h3>You have no Goals.</h3>;
  }
}
RenderGoals.propTypes = {
  goals: PropTypes.array,
};
export default RenderGoals;
