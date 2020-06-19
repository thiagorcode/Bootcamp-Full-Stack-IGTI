import React, { Component } from 'react'

export default class Salary extends Component {

  handleInputChange = (event) => {
    const inseridSalary = event.target.value;

    this.props.onChanged(inseridSalary)
  }
  render() {
    const { salary } = this.props
    return (
      <div>
        <span>Salário Bruto:</span>
        <input
          type="number"
          placeholder="Digite seu salário aqui"
          value={salary}
          onChange={this.handleInputChange}
        />
        <span>Base INSS:</span>
        <input
          type="text"
          readOnly
          placeholder="Base INSS"
          value={salary}
          min="1000"
        />
      </div>
    )
  }
}
