import React, { Component } from 'react'

export default class CalculatedIrpf extends Component {
  render() {
    return (
      <div>
        <span>Base IRPF:</span>
        <input
          type="text"
          readOnly
          placeholder="BASE IRPF"
        />
      </div>
    )
  }
}
