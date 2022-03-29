import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import "./flatly.min.css";
import Register from "./pages/Register";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(localStorage.getItem("currentUser"));

  const changeUser = (person) => {
    setUser(person);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <div>
      <Router>
        <Routes>
          {user && <Route path="/" element={<Home logout={logout} />} />}
        </Routes>
        <Routes>
          {!user && (
            <Route path="/" element={<Login changeUser={changeUser} />} />
          )}
        </Routes>
        <Routes>
          {!user && (
            <Route
              path="/register"
              element={<Register changeUser={changeUser} />}
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
