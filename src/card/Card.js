import React from 'react';
import './Card.scss';
import axios from 'axios';
import Modal from 'modal/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardStars from 'card/CardStars';
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { characters: [], showModal: false, modalData: {} };
  }
  componentDidMount() {
    axios
      .get('https://61563acee039a0001725a94b.mockapi.io/himym/characters')
      .then((response) => {
        this.setState({ characters: response.data });
      });
  }
  openModal = (data) => {
    this.setState({ showModal: true, modalData: data });
  };
  closeModal = () => {
    this.setState({ showModal: false, modalData: {} });
  };
  handleDelete = (id) => {
    const remaningData = this.state.characters.filter((item) => item.id !== id);
    this.setState({ characters: remaningData });
    toast.error(' 🤬 Deletered', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  handleSave = (id, starCount) => {
    // TODO:ERCU REISE SORULACAK
    // const filteredCharacter = this.state.characters.filter(
    //   (item) => item.id !== id
    // );
    // const editedCharacter = { ...this.state.modalData, stars: starCount };
    // const newData = [...filteredCharacter, editedCharacter];
    // this.setState({ characters: newData, showModal: false });
    const copyData = this.state.characters;
    const copyIndex = this.state.characters.findIndex((item) => item.id === id);
    copyData[copyIndex].stars = starCount;
    this.setState({ characters: copyData });

    toast('😎  Wow data edited!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  render() {
    return (
      <div className="card-list">
        {this.state.characters.map((data, index) => (
          <div key={index} className="card">
            <div className="character-info">
              <h2>{data.name}</h2>
              <div className="cardStars">
                <CardStars fakeStar={data.stars} />
              </div>
            </div>
            <div className="card-img">
              <img src={data.img} alt={data.name} />
            </div>
            <div className="card-buttons">
              <button
                onClick={() => {
                  this.openModal(data);
                }}
                className="edit"
              >
                Edit
              </button>
              <button
                onClick={() => this.handleDelete(data.id)}
                className="delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <Modal
          showModal={this.state.showModal}
          data={this.state.modalData}
          closeModal={this.closeModal}
          handleSave={this.handleSave}
        />
      </div>
    );
  }
}

export default Card;
