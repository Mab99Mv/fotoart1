import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import Logueo from "./components/Logueo.component";
import Home from "./components/Home.component";
import Add from "./components/Add.component";
import Galery from "./components/Galery.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((usuarioFirebase) => {
      console.log("Ya tienes sesión iniciada con:", usuarioFirebase);
      this.setState({ usuario: usuarioFirebase });
    });
  }

  setUsuario = (usuario) => {
    this.setState({ usuario });
  };

  render() {
    const { usuario } = this.state;

    // Verificar si hay un usuario antes de renderizar las rutas
    if (!usuario) {
      return <Logueo setUsuario={this.setUsuario} />;
    }

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

