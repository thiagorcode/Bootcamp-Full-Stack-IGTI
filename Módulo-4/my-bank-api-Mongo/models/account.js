import mongoose from "mongoose";

const accountsSchema = mongoose.Schema({
   agencia: {
      type: Number,
      required: true,
      validate(agencia) {
         if (agencia <= 0) throw new Error("Não existe agencia com valores negativos")
      }
   },
   conta: {
      type: Number,
      required: true,
      validate(conta) {
         if (conta <= 0) throw new Error("Não existe contas com valores negativos")
      }
   },
   name: {
      type: String,
      required: true,
   },
   balance: {
      type: Number,
      required: true,
      min: 0,
      validate(balance) {
         if (balance < 0) throw new Error("Não é possível fazer transferência com esse valor!")
      }
   },
})

const accountsModel = mongoose.model("accounts", accountsSchema, "accounts")


export { accountsModel }