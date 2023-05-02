import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom";

import AddFotoart from "./components/add-fotoart.component";
import FotoartlsList from "./components/fotoart-list.component";
import Home from "./components/Home.component";

class App extends Component {
  render() {
    return (
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galery" element={<FotoartlsList />} />
            <Route path="/add" element={<AddFotoart />} />
          </Routes>
      
    );
  }
}

export default App;
