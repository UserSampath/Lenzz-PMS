import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/pages/Login";
import PasswordChange from "./Components/pages/PasswordChange";
import Register from "./Components/pages/Register";
import Methods from "./Components/pages/Methods";
import EnterCompany from "./Components/pages/EnterCompany";

import Home from "./Components/pages/Home";
import CreateCompany from "./Components/pages/CreateCompany";
import ForgotPassword from "./Components/pages/ForgotPassword";
import Createproject from "./Components/popup/Createproject";
import Progress from "./Components/pages/Progress";
import Settings from "./Components/pages/Settings";
import Chatroom from "./Components/pages/Chatroom";
import Company from "./Components/pages/Company";
import Dashboard from "./Components/pages/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route
            path="/forgotPassword/:id/:token"
            element={<ForgotPassword />}
          />
          <Route path="/passwordChange" element={<PasswordChange />} />
          <Route path="/Methods" element={<Methods />} />
          <Route path="/EnterCompany" element={<EnterCompany />} />
          <Route path="/CreateCompany" element={<CreateCompany />} />
          <Route path="/CreateProject" element={<Createproject />} />
          <Route path="/Progress" element={<Progress />} />
          <Route path="/ChatRoom" element={<Chatroom />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
