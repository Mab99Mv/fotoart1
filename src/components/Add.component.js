import React, { Component } from "react";
import logo from "../img/logo.jpeg"
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import '../App.css';
import FotoService from "../services/fotoart.service";
import Navbar from "./Navbar.component"



export default class Add extends Component {
    state = {
      imagen: null,
      imagenURL: null,
      currentTutorial: {
      id:"",
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  
    handleSeleccionarImagen = (event) => {
      const archivo = event.target.files[0];
      const urlImagen = URL.createObjectURL(archivo);
      this.setState({
        imagen: archivo,
        imagenURL: urlImagen,
      });
  
      const storageRef = firebase.storage().ref();
      const imagenRef = storageRef.child(`imagenes/${archivo.name}`);
      imagenRef.put(archivo)
      .then(snapshot => {
        console.log('Imagen guardada en Firebase Storage');
        // Obtén la URL de la imagen guardada en Firebase Storage y actualiza el estado
        imagenRef.getDownloadURL().then(url => {
          console.log('URL de la imagen:', url);
          this.setState({ imagenURL: url });
        });
      })
      .catch(error => {
        console.error('Error al guardar la imagen en Firebase Storage:', error);
      });
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
      const { tutorial } = nextProps;
      if (tutorial && prevState.currentTutorial.id !== tutorial.id) {
        return {
          currentTutorial: tutorial
        };
      }
      return null;
    }
  
    componentDidUpdate(prevProps, prevState) {
      const { currentTutorial } = this.state;
      if (currentTutorial && prevState.currentTutorial && prevState.currentTutorial.id !== currentTutorial.id) {
        console.log('El tutorial actualizado es:', currentTutorial);
      }
    }
  
    componentDidMount() {
      this.setState({
        currentTutorial: this.props.tutorial,
      });
    }
  
    updatePublished = (status) => {
      FotoService.update(this.state.currentTutorial.id, {
        published: status,
      })
        .then(() => {
          this.setState((prevState) => ({
            currentTutorial: {
              ...prevState.currentTutorial,
              published: status,
            },
            message: "The status was updated successfully!",
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    
  
   
    render() 
    
    { 
      
       return (
          <div>
          <Navbar />
          <h4 id="te">Haz tu publicacion</h4>
         
            <div className="edit-form">
              <form>
                <div className="form-group">
                  <img className="logo" src={logo} alt=""/>
                  <input
                    type="file"
                    className="form-control"
                    id="title"
                    onChange={this.handleSeleccionarImagen}
                  />
                  {this.state.imagenURL && (
                    <img className="ima" src={this.state.imagenURL} alt="imagen compartida" />
                  )}
                </div>
               
               
                
  
             
           

            </form>
              <p>{this.state.message}</p>
          </div>

          
        </div>
      );
  
   }
  } 