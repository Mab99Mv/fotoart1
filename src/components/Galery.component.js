import React, { Component } from "react";
import "firebase/storage";
import '../App.css';
import { storage } from "../firebase";
import Reaction from "./Reacciones.component"


import Navbar from "./Navbar.component"

export default class Galery extends Component {
  state = {
    imagenes: [],
  };

  componentDidMount() {
    const fotosRef = storage.ref().child('imagenes');
    fotosRef.listAll().then((res) => {
      const imagenes = [];
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          imagenes.push({
            id: itemRef.name,
            url: url,
          });
          this.setState({ imagenes });
        });
      });
    });
  }
  
  componentWillUnmount() {
    // aquí puedes agregar cualquier limpieza necesaria antes de que se desmonte el componente
  }  

  
  render() {
    const { imagenes } = this.state;
    return (
      <div className="container">
        <Navbar />
        <div className="row">
          {imagenes.map((foto) => (
            <div className="col-md-4" key={foto.id}>
              <img
                className="img-thumbnail"
                src={foto.url}
                alt={foto.id}
                width="250"
                height="200"
              />
              <Reaction />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
