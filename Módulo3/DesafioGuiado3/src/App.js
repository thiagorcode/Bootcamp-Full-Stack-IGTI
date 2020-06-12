import React, { Component } from 'react';
import {getFormattedTimeStamp} from "./helpers/dateTimeHelpers.js";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: [],
    };
  }

  

  componentDidUpdate() {
    document.title = this.state.clickArray.length.toString();// Manipular o elemento title;
  }
  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getFormattedTimeStamp());

    this.setState({ clickArray: newClickArray });
  };

  render() {
    const { clickArray } = this.state;

    return (
      <div>
        <h1>
          React e <em>Class Components</em>
        </h1>

        <button onClick={this.handleClick}>Clique aqui</button>

        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>; // Aparenta que vai substituir o ultimos atributo no entato ele adiciona novas li's
          })}
        </ul>
      </div>
    );
  }
}
