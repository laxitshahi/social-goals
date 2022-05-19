import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
import Header from "./components/Header";

import { Dashboard, Register, Login, Universal, Graphs } from "./pages";
//You need these two libaries to use toast (react-toastify)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <div>
      <ChakraProvider>
        <Router className>
          <div className="font-mono">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/universal" element={<Universal />} />
              <Route path="/graphs" element={<Graphs />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </ChakraProvider>
    </div>
  );
}

export default App;
