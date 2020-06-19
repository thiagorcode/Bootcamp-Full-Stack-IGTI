import React, { Component } from 'react'

export default class CalculatedInss extends Component {
  handleValue = () => {
    console.log(this.props);
    const { } = this.props;

  }
  render() {
    console.log(this.props);
    const { inss } = this.props;
    return (
      <div>
        <span>Desconto INSS:</span>
        <input
          type="text"
          placeholder="Desconsto INSS"
          readOnly
          value={inss}
        />

      </div>
    )
  }
}
