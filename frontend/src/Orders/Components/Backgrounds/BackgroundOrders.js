
import "../style.css";
import PropTypes from "prop-types"; 
export default function BackgroundOrders({ children }) {
  return (
    <div className="background-container flex justify-center items-center ">
      <div
        className="background bg-[#ebeceb]  rounded-lg h-[34rem] w-[80%]"

      >
        {children}
      </div>
    </div>
  );
}
BackgroundOrders.propTypes = {
  children: PropTypes.node.isRequired,
};