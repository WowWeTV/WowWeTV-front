import PropTypes from "prop-types";
import wrapper from "../store";
import "../styles/globals.scss";

const App = ({ Component }) => {
  return <Component />;
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(App);
