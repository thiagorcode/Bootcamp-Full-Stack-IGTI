import express from "express";
import {promises} from "fs";

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;
const file = "./storage/grades.json";

router.post("/register", async (req, res) => {
  let register = req.body;
  try {
    let live = new Date();
    let data = await readFile(file, "utf8");
    let json = await JSON.parse(data);
    register += {"timestamp": toLocaleDateString(live)}//Modificar as datas.
    console.log(live)
    register = {id: json.nextId++, ...register};
    console.log(register)
    json.grades.push(register);

    await writeFile(file, JSON.stringify(json))
    res.send("Concluído");
    res.end();

  } catch (error) {
    console.log(error)
    
  }
})




export default router;