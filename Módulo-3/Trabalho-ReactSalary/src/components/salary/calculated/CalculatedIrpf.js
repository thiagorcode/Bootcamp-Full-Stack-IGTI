import React, { Component } from 'react'

export default class CalculatedIrpf extends Component {
  render() {
    const { irpf } = this.props
    return (
      <div>
        <span>Base IRPF:</span>
        <input
          type="text"
          readOnly
          placeholder="BASE IRPF"
          value={`R$ ${irpf}`}
        />
      </div>
    )
  }
}
