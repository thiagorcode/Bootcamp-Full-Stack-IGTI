import express from "express";
import mongoose from "mongoose";
import accountsRouter from "../routes/accounts.js";

import swaggerUI from "swagger-ui-express";
import winston from "winston";//Gravação de log
import { swaggerDocument } from "./doc.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cluster0.dnlgo.gcp.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
  } catch (err) {
    logger.info("Não foi possível fazer a conexão ao banco de dados!")
  }
})()


global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-bank-api.log" })
  ],
  format: combine(
    label({ label: "my-bank-api" }),
    timestamp(),
    myFormat
  )
})


app.use(express.json());
app.use("/", accountsRouter);
//                  ! 
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());

const port = 3001;

app.listen(port, async () => {
  try {
    logger.info("API STARTED!!")
  } catch (err) {
    console.log(err)
  }
})