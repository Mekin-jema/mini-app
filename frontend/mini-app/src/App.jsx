import React from 'react';
import {Routes, Route} from "react-router-dom";
// import './App.css';
import Login from './pages/Login.jsx';
import AddEmployee from "./pages/AddEmployee.jsx";
import Home from './pages/Home.jsx';
import "./app.css";

function App() {

  return(
    
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/employee' element = {<AddEmployee/>}/>
    </Routes>
  )
  
}

export default App
