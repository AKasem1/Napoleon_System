import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/form/Form";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/home page/Home";
import Login from "./components/login/Login";
import Students1 from "./components/student/Students1";
import Preloader from "./components/preloader";
import logo from "./pic/logo.jpg";
import AddGroups from "./components/AddGroups";
import RequireAuth from "./components/ReqiureAuth/ReqiureAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import Center from "./components/Dashboard/Center";
import PrintHouse from "./components/Dashboard/PrintHouse";
import Expenses from "./components/Dashboard/Expenses";
import StartClass from "./components/StartClass/StartClass";
import Quiz from "./components/Quiz/Quiz";
// import Footer from "./components/Footer";
import GeneratePdf from "./components/student/GeneratePdf";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="App">
      {loading ? (
        <Preloader  logo={logo} />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/pdf" element={<GeneratePdf />} />
            <Route path="/students1" element={<Students1 />} />
            <Route path="/AddGroups" element={<AddGroups />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard:center" element={<Center />} />
            <Route path="/dashboard:printhouse" element={<PrintHouse />} />
            <Route path="/dashboard:expenses" element={<Expenses />} />
            <Route path="/startclass" element={<StartClass />} />
            <Route path="/Quiz" element={<Quiz />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
