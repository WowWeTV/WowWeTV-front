import PropTypes from "prop-types";

import "../styles/globals.scss";

const App = ({ Component }) => {
  return <Component />;
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default App;
