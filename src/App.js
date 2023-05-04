import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom";

import Add from "./components/Add.component";
import Galery from "./components/Galery.component";
import Home from "./components/Home.component";

class App extends Component {
  render() {
    return (
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/galery" element={<Galery />} />
          </Routes>
      
    );
  }
}

export default App;