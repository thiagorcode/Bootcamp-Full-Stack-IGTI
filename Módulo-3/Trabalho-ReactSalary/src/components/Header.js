import React, { Component } from 'react'
import css from "../components/css/app.module.css"

export default class Header extends Component {
  render() {
    return (
      <div className={css.header}>
        <h1>React Salary</h1>
      </div>
    )
  }
}
