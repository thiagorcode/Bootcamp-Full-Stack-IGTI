import React from 'react'
import { formatNumber, formatPercentage } from "../helpers/formatHelpers"
import css from "../helpers/income.module.css"

export default function Income({ currentValue }) {

   return (
      <div className={css.flexRow}>
         {
            currentValue.map(block => {
               const { recipe, id, stonks, taxe, currentPercetange } = block
               let styleSheet = ""
               if (taxe > 0) {
                  styleSheet = "green"
               } else {
                  styleSheet = "red"
               }
               return (
                  <div key={id} className={css.container}>
                     <span>{id}</span>
                     <ul >
                        <li style={{ color: styleSheet }}>{formatNumber(recipe)}</li>
                        <li style={{ color: styleSheet }}>{formatNumber(stonks)}</li>
                        <li>{formatPercentage(currentPercetange)}</li>
                     </ul>
                  </div>
               )
            })
         }
      </div>
   )
}
