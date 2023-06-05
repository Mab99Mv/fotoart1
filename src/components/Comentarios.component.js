import React, { Component } from "react";
import "../comen.css";
import KafkaService from "../services/kafka.service";
import axios from 'axios';

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
      commentText: ""
    };
    this.uri = "https://apimo-service-new-mab99mv.cloud.okteto.net/api/comments";
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    try {
      const response = await axios.get(`${this.uri}/${this.props.id}`);
      const comentarios = response.data ? response.data : [];
      this.setState({ comentarios });
    } catch (error) {
      console.log('Error al obtener los comentarios:', error);
    }
  };

  comment = (e) => {
    const { commentText } = this.state;
    const user = localStorage.getItem('user');
    const data = {
      userId: user,
      objectId: this.props.id,
      comment: commentText
    };

    console.log(JSON.stringify(data));
    KafkaService.commentPush(data);
    e.preventDefault();
  };

  render() {
    const { comentarios, commentText } = this.state;

    return (
      <div className="comments-section">
        <h4>Comments</h4>
        <div className="form-group">
          <label htmlFor="comment-input">Leave a comment:</label>
          <textarea
            id="comment-input"
            name="comment"
            rows="4"
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => this.setState({ commentText: e.target.value })}
          ></textarea>
        </div>
        <button type="button" onClick={this.comment}>
          Comentar
        </button>
        <div className="comments-list">
          {comentarios.map((comentario) => (
            <div className="comment" key={comentario._id}>
              <h5>{comentario.userId}</h5>
              <p>{comentario.comment}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comentarios;
