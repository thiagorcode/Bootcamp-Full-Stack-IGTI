import React, { Component } from 'react'

export default class CalculatedInss extends Component {

  render() {

    const { inss, percent } = this.props;

    return (
      <div>
        <span>Desconto INSS:</span>
        <input
          type="text"
          placeholder="Desconsto INSS"
          readOnly
          value={`R$ ${inss} (${percent}%)`}
          style={{ color: "rgb(243, 139, 3)" }}
        />

      </div>
    )
  }
}
