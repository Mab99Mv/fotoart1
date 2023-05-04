import React, { Component } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

class Navbar extends Component {
  render() {
    return (

      <div className="container">
        <nav className="navbar navbar-expand ">
          <motion.a 
          href="/" className="brand"
          initial={{scale:0}}
          animate={{scale: 1}}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}>
            FotoArt
          </motion.a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="link">
                Add Art
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/galery"} className="link2">
                Galery
              </Link>
            </li>
          </div>
        </nav>
         </div>
      
    );
  }
}

export default Navbar;