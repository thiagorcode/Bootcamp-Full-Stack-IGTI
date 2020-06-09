import express from "express";
import {promises, read} from "fs";
import gradeRouter from "../routers/grade.js"

const app = express();
const readFile = promises.readFile;
const writeFile = promises.writeFile;
const file = "./storage/grades.json";
const port = 3001;

app.use(express.json());
app.use("/grade", gradeRouter)

app.listen(port, async ()=> {
  try {
    await readFile(file, "utf8");
    console.log("Api Started")
  } catch (error) {
    console.log("Arquivo JSON não existe!! Favor Verificar!")
  }
})

