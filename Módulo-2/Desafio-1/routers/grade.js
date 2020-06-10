import express from "express";
import {promises, write} from "fs";

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;
const file = "./storage/grades.json";

async function readOneFile() {
  let data = await readFile(file, "utf8");
  let json = JSON.parse(data);
  return json;
}

router.post("/register", async (req, res) => {
  let register = req.body;
  try {
    let live = new Date();
    let json = await readOneFile();

    register = {...register, "timestamp": live}//Modificar as datas.
    
    register = {id: json.nextId++, ...register};
    json.grades.push(register);

    await writeFile(file, JSON.stringify(json))
    res.send("Concluído");
    res.end();
  } catch (error) {
    console.log("Programador apresentou um erro: " + error);
  }
})

router.put("/modifier" , async (req, res) => {
  try {
    let live     = new Date();
    let modifier = req.body;
    let data     = await readFile(file, "utf8");
    let json     = await JSON.parse(data);

    let indexPut = await json.grades.findIndex(student => {
      return student.id === modifier.id;
    })
    
    modifier = {...modifier, "timestamp": live}
    json.grades[indexPut].student   = modifier.student;
    json.grades[indexPut].subject   = modifier.subject;
    json.grades[indexPut].type      = modifier.type;
    json.grades[indexPut].value     = modifier.value;  
    json.grades[indexPut].timestamp = modifier.timestamp;

    if(indexPut >= 0) {
      writeFile(file, JSON.stringify(json));
      
      res.send(`<h1>Atualizado com sucesso \n </h1>`);
    } else{
      throw new error;
    }
  } catch (error) {
    res.send("Dados não existem!!! "+error)
  }
})
router.delete("/delete/:id", async (req, res) => {
  try {
    let storage = await readOneFile();

    let json = storage.grades.filter(student => student.id !== parseInt(req.params.id, 10));
    storage.grades = json;
    writeFile(file, JSON.stringify(storage));
    res.send("Usuário deletado");
    res.end();
  } catch (error) {
    console.log(error)
    res.status(400);
  }
})

router.get("/search/:id", async (req, res) => {
  try {
    let storage = await readOneFile();
  
    let search  = storage.grades.filter(student => student.id === parseInt(req.params.id, 10));
  
    if(search.length != 0) {
      res.send(search)
    }else {
      res.send("Não existe")
    }
  } catch (error) {
    res.status(404);
  }
})

 router.get("/:student/:subject", async (req, res) => {
   let student = req.params.student;
   let subject = req.params.subject;
  try {
    let storage = await readOneFile();

    let data   = storage.grades
    .filter(gradeStudent => gradeStudent.student == student)
    .filter(newGrade => newGrade.subject == subject)

    let result = data.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0)

    if (data.length != 0){
      res.send(`O resultado para o aluno ${student} para a matéria ${subject} é: ${result}`)
      res.end()
    } else {
      throw new error;
    }
  } catch (error) {
    res.status(400).send("Não existe dados!")
    
  }
 })

 router.get("/consulta/:subject/:type", async (req, res) => {
   let subject = req.params.subject;
   let type    = req.params.type;
  try {
    let storage = await readOneFile();
    storage = storage.grades.filter(searchType => searchType.type == type)
    .filter(searchSubject => searchSubject.subject == subject)
    .reduce((acc, curr) => {
      return  acc + curr.length ;// Fazer média dos valores
    }, 0);
    console.log(storage);
    res.send()
    res.end();
  } catch (error) {
    console.log(error)
  }
});

export default router;