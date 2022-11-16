import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./Services/auth-service";

import Login from "./Components/Login";
//import Register from "./components/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import BoardUser from "./Components/BoardUser";
//import BoardModerator from "./components/BoardModerator";
import AdminBoard from "./Components/AdminBoard";
import DisplayBook from "./Components/DisplayBook";
import DisplayBookuser from "./Components/DisplayBookuser";
import Addbook from "./Components/Addbook";
import Viewbook from "./Components/Viewbook";
import Borrowbook from "./Components/Borrowbook";
import Register from "./Components/Register";
const App = () => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Library Management System
        </Link>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li> */}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/Displaybookuser"} className="nav-link">
                DisplayBook
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/addbook"} className="nav-link">
                Add Book
              </Link>
            </li>
          )} 

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/displayBook"} className="nav-link">
                Update Book
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/borrow"} className="nav-link">
                Borrow Book
              </Link>
            </li>
          )}
          </div>
          
        {currentUser ? (
          <div className="navbar-nav ml-auto" style={{"margin-left":"580px"}}>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/view-book/:id" element={<Viewbook/>} />
          <Route path="/displayBook" element={<DisplayBook/>} />
          <Route path="/borrow" element={<Borrowbook/>} />
          <Route path="/Displaybookuser" element={<DisplayBookuser/>} />
          <Route path="/addbook" element={<Addbook/>} />
          <Route path="/edit-book/:id" element={<Addbook/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;