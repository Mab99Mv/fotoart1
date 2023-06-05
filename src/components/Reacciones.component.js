import '../reacciones.css';
import KafkaService from '../services/kafka.service';
import React, { Component } from 'react';
import axios from 'axios';

class Reacciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reactions: {},
    };
    this.uri = 'https://apimo-service-new-mab99mv.cloud.okteto.net'; // Actualiza la URL base aquí
  }

  componentDidMount() {
    this.fetchReactions();
  }
  fetchReactions = () => {
    const { id } = this.props;
  
    axios
      .get(`${this.uri}/reactions/${encodeURIComponent(id)}/count`)
      .then((response) => {
        const { count } = response.data;
        this.setState((prevState) => ({
          reactions: {
            ...prevState.reactions,
            [id]: count,
          },
        }));
      })
      .catch((error) => {
        console.log('Error al obtener las reacciones:', error);
      });
  };
  
  sendReaction = (status) => {
    const user = localStorage.getItem('user');
    const data = {
      userId: user,
      objectId: this.props.id,
      reactionId: status,
    };
    console.log('Datos de reacción:', data);
    console.log(JSON.stringify(data));
    KafkaService.reactionPush(data);
  };

  reaction = (e, status) => {
    e.preventDefault();
    this.sendReaction(status);
    this.fetchReactions();
  };

  render() {
    const { id } = this.props;
    const { reactions } = this.state;
    const reactionCount = reactions[id] || 0;

    return (
      <div className="reactions">
        <div
          className="reaction reaction-like"
          onClick={(e) => this.reaction(e, 'like')}
        >
          <tool-tip></tool-tip>
          <p>{reactionCount}</p>
        </div>

        <div
          className="reaction reaction-love"
          onClick={(e) => this.reaction(e, 'love')}
        >
          <tool-tip></tool-tip>
          <p>{reactionCount}</p>
        </div>

        <div
          className="reaction reaction-haha"
          onClick={(e) => this.reaction(e, 'haha')}
        >
          <tool-tip></tool-tip>
          <p>{reactionCount}</p>
        </div>

        <div
          className="reaction reaction-wow"
          onClick={(e) => this.reaction(e, 'wow')}
        >
          <tool-tip></tool-tip>
          <p>{reactionCount}</p>
        </div>

        <div
          className="reaction reaction-sad"
          onClick={(e) => this.reaction(e, 'sad')}
        >
          <tool-tip></tool-tip>
          <p>{reactionCount}</p>
        </div>

        <div
          className="reaction reaction-angry"
          onClick={(e) => this.reaction(e, 'angry')}
        >
          <tool-tip></tool-tip>
          <p>{reactionCount}</p>
        </div>
      </div>
    );
  }
}

export default Reacciones;

