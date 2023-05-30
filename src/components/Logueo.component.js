import React, { Component } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "../Login.css";

class Logueo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistrando: false,
    };
  }

  crearUsuario = (correo, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, correo, password)
      .then((usuarioFirebase) => {
        console.log("Usuario creado:", usuarioFirebase);
        this.props.setUsuario(usuarioFirebase.user);
      })
      .catch((error) => {
        console.log("Error al crear el usuario:", error);
      });
  };

  iniciarSesion = (correo, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, correo, password)
      .then((usuarioFirebase) => {
        console.log("Sesión iniciada con:", usuarioFirebase.user);
        this.props.setUsuario(usuarioFirebase.user);
      })
      .catch((error) => {
        console.log("Error al iniciar sesión:", error);
      });
  };

  signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const usuarioFirebase = result.user;
        console.log("Sesión iniciada con Google:", usuarioFirebase);
        this.props.setUsuario(usuarioFirebase);
      })
      .catch((error) => {
        console.log("Error al iniciar sesión con Google:", error);
      });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;

    if (this.state.isRegistrando) {
      this.crearUsuario(correo, password);
    } else {
      this.iniciarSesion(correo, password);
    }
  };

  toggleRegistrando = () => {
    this.setState((prevState) => ({
      isRegistrando: !prevState.isRegistrando,
    }));
  };

  render() {
    const { isRegistrando } = this.state;

    return (
      <div>
        <h1 className="titulo">{isRegistrando ? "Registrate" : "Iniciar sesión"}</h1>
        <form onSubmit={this.submitHandler}>
          <input type="email" id="emailField" className="inputField" />
          <input type="password" id="passwordField" className="inputField" />
          <button type="submit" className="submitButton">{isRegistrando ? "Registrate" : "Iniciar sesión"}</button>
        </form>
        <button onClick={this.toggleRegistrando} className="toggleButton">
          {isRegistrando ? "¿Ya tienes cuenta? ¡Inicia sesión!" : "¿No tienes cuenta todavía? ¡Registrate gratis!"}
        </button>
        <h1 className="or">or</h1>
        <button onClick={this.signInWithGoogle} className="googleButton">Iniciar sesión con Google</button>
      </div>
    );
  }
}

export default Logueo;
