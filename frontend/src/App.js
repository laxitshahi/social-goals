import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
import Header from "./components/Header";

import { Dashboard, Register, Login, Universal } from "./pages";
//You need these two libaries to use toast (react-toastify)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <Router className>
        <div className="font-mono">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/universal" element={<Universal />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
