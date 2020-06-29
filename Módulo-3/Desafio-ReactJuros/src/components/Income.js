import React from 'react'
import { formatNumber, formatPercentage } from "../helpers/formatHelpers"
import css from "../helpers/income.module.css"

export default function Income({ currentValue }) {

   return (
      <div className={css.flexRow}>
         {
            currentValue.map(block => {
               const { recipe, id, initialValue, stonks, taxe, currentPercetange } = block
               let styleSheet = ""
               if (taxe > 0) {
                  styleSheet = styles.positive
               } else {
                  styleSheet = styles.negative
               }
               return (
                  <div key={id} className={css.container}>
                     <span>{id}</span>
                     <ul >
                        <li style={styleSheet}>{formatNumber(recipe)}</li>
                        <li>{formatNumber(stonks)}</li>
                        <li>{formatPercentage(currentPercetange)}</li>
                     </ul>
                  </div>
               )
            })
         }
      </div>
   )
}
const styles = {
   positive: {
      color: "green",
   },
   negative: {
      color: "red"
   }
}