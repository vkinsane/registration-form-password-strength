import { BrowserRouter as Router, Route } from "react-router-dom";
import "./assets/css/App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register.js";
function App() {
  return (
    <Router>
      {/* {localStorage.getItem("loadComponent") == undefined && ( */}
      <Route path="/" exact render={() => <Register />} />
    </Router>
  );
}

export default App;
