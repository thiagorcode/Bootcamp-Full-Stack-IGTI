import React, { Component } from 'react';
import Salary from "./components/salary/Salary"
import CalculatedInss from './components/salary/calculated/CalculatedInss';
import CalculatedIrpf from "./components/salary/calculated/CalculatedIrpf"

import css from "./components/css/app.module.css"


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      inputSalary: 1000,
      inss: 0,
      baseIRPF: 0,
      valueRealSalary: 0
    }
  }
  handleInputSalary = (value) => {
    console.log(value);
    this.setState({
      inputSalary: value,
    })

    var valueInss = '';

    if (value <= 1045 && value >= 0) {
      valueInss = value * 0.075;
      valueInss += " (7,50%)";
    } else {
      if (value > 1045 && value <= 2089.60) {
        valueInss = value * 0.09;
        valueInss += " (9,00%)";
      } else {
        if (value > 2089 && value <= 3134.40) {
          valueInss = value * 0.12;
          valueInss += " (12,00%)";
        } else {
          valueInss = value * 0.14;
          valueInss += " (14,00%)";
        }
      }

      this.setState({
        inss: valueInss
      });
    }
  }


  render() {
    const { inputSalary, inss } = this.state;
    return (
      <div className={css.main}>
        <Salary onChanged={this.handleInputSalary} salary={inputSalary} />
        <CalculatedInss onChanged={this.handleCalculatedInss} inss={inss} />
        <CalculatedIrpf />

        <input type="number" readOnly placeholder="Desconto IRPF" />
        <input type="number" readOnly placeholder="Salário liquido" />
      </div>
    )
  }
}
