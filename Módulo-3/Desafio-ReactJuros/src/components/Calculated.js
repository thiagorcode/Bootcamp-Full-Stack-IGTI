import React, { useState, useEffect } from 'react';
import { formatPercentage } from "../helpers/formatHelpers"

import css from "../helpers/income.module.css"

export default function Calculated({ calculated }) {
   const [initialValue, setInitialValue] = useState(1000);
   const [initialTaxe, setInitialTaxe] = useState(0);
   const [initialTime, setInitialTime] = useState(0)
   const [increment, setIncrement] = useState(0)
   
   
   useEffect(() => {
      const formData = {
         initialValue,
         initialTaxe,
         initialTime,
         increment,
      }
      calculated(formData)

   }, [initialValue, initialTaxe, initialTime, increment])

   const handleInputValue = (event) => {
      setInitialValue(+event.target.value)
   }

   const handleInputTaxe = (event) => {
      setInitialTaxe(+event.target.value)
   }

   const handleInputTime = (event) => {
      setInitialTime(+event.target.value)
   }
   const handleInputIncrement = (event) => {
      setIncrement(+event.target.value)
   }
   

   let taxeAA = initialTaxe * 12;

   return (
      <div>
         <form style={styles.flexRow}  >
            <div className={css.containerInput}>
               <input
                  type="number"
                  id="montaded"
                  step="1"
                  autoFocus
                  min="1"
                  value={initialValue}
                  onChange={handleInputValue}
               />
               <label className="active" htmlFor="montaded">
                  Montante Inicial
                  </label>
            </div>
            <div className={css.containerInput} >
               <input
                  type="number"
                  id="taxe"
                  step="0.01"
                  value={initialTaxe}
                  onChange={handleInputTaxe}
               />
               <label className="active" htmlFor="taxe">
                  Taxa de Juros (Ao Mês) | {formatPercentage(taxeAA)} (Ao ano):
               </label>
            </div>
            <div className={css.containerInput} >
               <input
                  type="number"
                  id="time"
                  value={initialTime}
                  onChange={handleInputTime}
                  min="0"
               />
               <label className="active" htmlFor="time">
                  Período (Mensal):
               </label>
            </div>
            <div className={css.containerInput} >
               <input
                  type="number"
                  id="time"
                  value={increment}
                  onChange={handleInputIncrement}
                  min="0"
               />
               <label className="active" htmlFor="time">
                  Investimento (Mensal):
               </label>
            </div>
         </form>
      </div>
   )
}
const styles = {
   container: {
      width: "30%",
      margin: "15px",
   },
   flexRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center"
   }
}