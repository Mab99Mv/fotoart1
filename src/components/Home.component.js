import React, { Component } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar.component";
import logo from "../img/logo.jpeg"

class Home extends Component {
  
  render() {
    return (

      <div className="container">
       <Navbar/>
        <img className="portada" src={logo} alt=""/>
         </div>
      
    );
  }
}

export default Home;