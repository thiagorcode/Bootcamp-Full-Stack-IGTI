import React from 'react'
import css from "./postion.module.css"

export default function Position({ children }) {
  return <div className={css.position}>
    {children}
  </div>

}
