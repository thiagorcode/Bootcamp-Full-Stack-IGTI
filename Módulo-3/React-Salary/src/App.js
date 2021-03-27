import React, { Component, Fragment } from 'react';
import Salary from "./components/salary/Salary"
import CalculatedInss from './components/salary/calculated/CalculatedInss';
import CalculatedIrpf from "./components/salary/calculated/CalculatedIrpf"
import Header from "./components/Header"

import css from "./components/css/app.module.css"


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      inputSalary: 1000.00,
      inss: 0,
      baseIRPF: 0,
      discountIRPF: 0,
      valueRealSalary: 0,
      percentageINSS: 0,
      percentageIRPF: 0,
      percentageLiquid: 0,
      baseINSS: 0
    }
  }
  handleInputSalary = (value, salary) => {
    const { baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary } = value

    let percentINSS = ((discountINSS / salary) * 100)
    let percentIRPF = ((discountIRPF / salary) * 100)
    let percentLiquid = (100 - (percentINSS + percentIRPF))

    this.setState({
      inputSalary: salary,
      baseINSS: baseINSS,
      inss: discountINSS,
      discountIRPF: discountIRPF,
      baseIRPF: baseIRPF.toFixed(2),
      valueRealSalary: netSalary.toFixed(2),
      percentageINSS: percentINSS.toFixed(2),
      percentageIRPF: percentIRPF.toFixed(2),
      percentageLiquid: percentLiquid.toFixed(2)
    });

  }

  render() {
    const { inputSalary, baseINSS, inss, baseIRPF, percentageINSS,
      valueRealSalary, discountIRPF, percentageIRPF, percentageLiquid } = this.state;
    return (
      <Fragment>
        <Header />
        <div className={css.main}>
          <Salary onChanged={this.handleInputSalary} salary={inputSalary} />
          <div className={css.flex}>
            <div className={css.container}>
              <span>Base INSS:</span>
              <input
                type="text"
                readOnly
                placeholder="Base INSS"
                value={`R$ ${baseINSS}`}
                min="1000"
              />
            </div>
            <div className={css.container}>
              <CalculatedInss inss={inss} percent={percentageINSS} />
            </div>
            <div className={css.container}>
              <CalculatedIrpf irpf={baseIRPF} />
            </div>
            <div className={css.container}>
              <span>Desconto IRPF:</span>
              <input
                type="text"
                readOnly
                placeholder="Desconto IRPF"
                value={`R$ ${discountIRPF} (${percentageIRPF}%)`}
                style={{ color: "rgb(179, 0, 0)" }}
              />
            </div>
          </div>
          <span>Salário Liquido:</span>
          <input
            type="text"
            readOnly
            placeholder="Salário liquido"
            value={`R$ ${valueRealSalary} (${percentageLiquid}%)`}
            style={{ color: "rgb(7, 189, 83)" }}
          />

          <div className={css.barraGraph}>
            <div style={{ width: `${percentageINSS}%`, backgroundColor: `rgb(243, 139, 3)` }}></div>
            <div style={{ width: `${percentageIRPF}%`, backgroundColor: `rgb(179, 0, 0)` }}></div>
            <div style={{ width: `${percentageLiquid}%`, backgroundColor: `rgb(7, 189, 83)` }}></div>
          </div>
        </div>
      </Fragment>
    )
  }
}
