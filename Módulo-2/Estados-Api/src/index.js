import express from "express";
import {promises} from "fs";
import countryRouter from "../routers/country.js";

const app = express();
const readFile = promises.readFile;
const writeFile = promises.writeFile
const port = 3000;

app.use(express.json());
app.use("/states", countryRouter);

app.listen(port, async () => {
  try {

    let state = await readFile("Estados.json", "utf8");
    state = JSON.parse(state)
    await state.forEach( file => {
      const { Sigla } = file;
      readFile(`${Sigla}.json`, "utf8")
      
    });
    console.log("Api Started");
    throw new err;
    
  } catch (err) {
    let state = await readFile("Estados.json", "utf8");
    let city = await readFile("Cidades.json", "utf8");
    state = JSON.parse(state)
    city = JSON.parse(city)
    state.forEach( file => {
      const {ID, Sigla, Nome} = file;
      let major = city.filter( major => {
        const { Estado} = major
        return Estado === ID;
      });

      const initialJson = {
        ID: ID,
        sigla: Sigla,
        nome: Nome,
        city:[
          major
        ]
      }
      writeFile(`${Sigla}.json`, JSON.stringify(initialJson)).catch(err => {
        console.log(err)
      })
    });
    

  }
})
