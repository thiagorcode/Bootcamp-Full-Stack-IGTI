import React, { Component } from 'react';

export default class Podcast extends Component {
  render() {
    const { podcast } = this.props;

    if (!podcast) {
      return <p>Podcast não encontrado!</p>;
    }

    const { img, title, description } = podcast;
    const { imageStyle } = styles;

    return (
      <div className='center'>
        <img style={imageStyle} src={`./img/${img}`} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  }
}

const styles = {
  imageStyle: {
    width: '300px',
    height: '300px',
  },
};
