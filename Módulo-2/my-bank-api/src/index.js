import express from "express";
import swaggerUI from "swagger-ui-express"
import winston from "winston";//Gravação de log
import accountsRouter from "../routes/accounts.js";
import { swaggerDocument } from "./doc.js";// Quando não é definido o default tem que especificar qual váriavel vai ser exportada
// Quando determinado com o comando exemplo export default swaggerDocument;
import { promises } from "fs";
import cors from "cors";

const readFile = promises.readFile;
const writeFile = promises.writeFile
const app = express();

const port = 3000;
const file = "accounts.json"



const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

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
app.use("/account", accountsRouter);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());

app.listen(port, async () => {
  try {
    await readFile(file, "utf8");
    logger.info("API STARTED!!")
    
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    writeFile(file, JSON.stringify(initialJson)).catch(err => {
      console.log(err);
    });
  }
})