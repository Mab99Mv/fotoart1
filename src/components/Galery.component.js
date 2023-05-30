import React, { Component } from "react";
import "firebase/storage";
import "../App.css";
import { storage } from "../firebase";
import Reaction from "./Reacciones.component";
import FotoService from "../services/fotoart.service";
import  Comenta from "./Comentarios.component";

import Navbar from "./Navbar.component";

export default class Galery extends Component {
  state = {
    imagenes: [],
    eliminandoImagen: false,
    selectedImagen: null,
  };

  componentDidMount() {
    const fotosRef = storage.ref().child("imagenes");
    fotosRef.listAll().then((res) => {
      const imagenes = [];
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          if (url && itemRef.name) { // comprobar si itemRef.name no es undefined
            imagenes.push({
              id: itemRef.name,
              url: url,
            });
            this.setState({ imagenes });
          }
        }).catch((error) => {
          console.log(error); // manejo de errores
        });
      });
    });
  }
  handleDelete = (id) => {
    if (!id) {
      console.log("ID no válido:", id);
      return;
    }
  
    this.setState({ eliminandoImagen: true });
  
    FotoService.delete(id)
      .then(() => {
        const { imagenes } = this.state;
        const newImagenes = imagenes.filter((foto) => foto.id !== id);
        this.setState({ imagenes: newImagenes });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.setState({ eliminandoImagen: false });
      });
  };
  
  

  handleImagenClick = (id) => {
    const { imagenes } = this.state;
    const selectedImagen = imagenes.find((foto) => foto.id === id);
    this.setState({ selectedImagen });
  };

  render() {
    const { imagenes, eliminandoImagen, selectedImagen } = this.state;
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
                onClick={() => this.handleImagenClick(foto.id)}
              />
              <Reaction />
              <Comenta />
              {eliminandoImagen && (
                <div className="spinner-border" role="status"></div>
              )}
              <button onClick={() => this.handleDelete(foto.id)}>Eliminar</button>
            </div>
          ))}
        </div>
        {selectedImagen && (
          <div className="imagen-en-grande">
            <img src={selectedImagen.url} alt={selectedImagen.id} />
            <button onClick={() => this.setState({ selectedImagen: null })}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    );
  }
}
