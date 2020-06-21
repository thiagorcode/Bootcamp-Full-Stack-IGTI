import React, { Component } from 'react'
import { calculateSalaryFrom } from "./calculated/salary"

export default class Salary extends Component {

  handleInputChange = (event) => {
    const inseridSalary = event.target.value;
    let calculated = calculateSalaryFrom(inseridSalary)

    this.props.onChanged(calculated, inseridSalary)
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

      </div>
    )
  }
}
