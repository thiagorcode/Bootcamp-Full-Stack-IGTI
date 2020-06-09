import express from "express";
import { promises } from "fs";

const router = express.Router();
const app = express();
const readFile = promises.readFile;
const writeFile = promises.writeFile;

async function  readState() {
  let readMe = await readFile("Estados.json", "utf8");
  readMe = JSON.parse(readMe);
  return readMe;
}
async function  readCity() {
  let nameState = await readState();
  nameState = nameState.map
  let readMe = await readFile()
  return readMe
}

router.get("/:id", async (req, res) => {
  try {
    let state = await readState();
    let selectState = null;

    await state.filter(major => {
      const { Sigla } = major;
      return Sigla === req.params.id;
    }).map(uf => {
      const { Nome, Sigla, ID } = uf
      selectState = readFile(`${Sigla}.json`, "utf8")
      return {
        estado: Nome,
        uf: Sigla,
        id: ID
      }
    })
    selectState.then(data => JSON.parse(data)).then(data => {
      if (data) {
        res.send(data)
      }
    }).catch((err) => {
      res.end
      console.log(err)
    })
    
  } catch (err) {
    res.status(400).send({ error: err.message });

  }
})

router.get("/", async (req, res) => {

  try {
    let state = await readState();
    let selectState;
    let countState
    await state.forEach(uf => {
      const { Nome, Sigla, ID } = uf
      selectState = readFile(`${Nome}.json`, "utf8")
      selectState.then(data => JSON.parse(data)).then(data => {
        data.map(major => {
          const { ID, sigla, nome, city} = major
          console.log(nome)
        })

      });
      
      return {
        Estado: Nome,
        Uf: Sigla,
        id: ID
      }
    })
    res.send(countState)
    // selectState.then(data => JSON.parse(data)).then(data => {
    //   if (data) {
    //     res.send(data)
    //   }
    // }).catch((err) => {
    //   res.end
    //   console.log(err)
    // })
    
  } catch (err) {
    res.status(410).send({ error: err.message });
  }
});


export default router;
