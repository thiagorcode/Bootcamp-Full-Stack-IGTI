import React, { useState } from 'react'

export default function Calculated({ calculated }) {
   const [initialValue, setInitialValue] = useState(0);
   const [initialTaxe, setInitialTaxe] = useState(0);
   const [initialTime, setInitialTime] = useState(0)

   const handleInputValue = (event) => {
      setInitialValue(+event.target.value)
   }

   const handleInputTaxe = (event) => {
      setInitialTaxe(event.target.value)
   }

   const handleInputTime = (event) => {
      setInitialTime(event.target.value)
   }

   const handleSendCalculated = (event) => {
      event.preventDefault()

      const formData = {
         initialValue,
         initialTaxe,
         initialTime,
      }
      calculated(formData)
   }
   return (
      <div>
         <form onSubmit={handleSendCalculated} style={styles.flexRow}  >
            <div className="input-field" style={styles.container}>
               <input
                  type="number"
                  id="montaded"
                  step="1"
                  autoFocus
                  min="1"
                  onChange={handleInputValue}
               />
               <label className="active" htmlFor="montaded">
                  Montante Inicial
                  </label>
            </div>
            <div className="input-field" style={styles.container}>
               <input
                  type="number"
                  id="taxe"
                  step="0.01"
                  onChange={handleInputTaxe}
               />
               <label className="active" htmlFor="taxe">
                  Taxa de Juros (Ao Mês):
               </label>
            </div>
            <div className="input-field" style={styles.container}>
               <input
                  type="number"
                  id="time"
                  onChange={handleInputTime}
               />
               <label className="active" htmlFor="time">
                  Período (Mensal):
               </label>
            </div>
            <button className="waves-effect waves-light btn">
               Calcular
            </button>
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
   }
}