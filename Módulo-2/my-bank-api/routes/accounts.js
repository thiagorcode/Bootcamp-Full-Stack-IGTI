import express from "express";
const router = express.Router();
import {promises} from "fs";

const readFile = promises.readFile;
const writeFile = promises.writeFile
const file = "accounts.json";


router.post('/', async (req, res) => {
  let account = req.body;
  try {
    let data = await readFile(file, "utf8")
    let json = JSON.parse(data);
    
    account = { id: json.nextId++, ...account }
    json.accounts.push(account);
    
    await writeFile(file, JSON.stringify(json));

    res.send("Concluído");
    res.end();
    logger.info(`POST /account - ${JSON.stringify(account)}`)
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Post /account - ${err.message}`)
  }  
});

router.get("/", async (_, res) => {
  try {
    let data = await readFile(file, "utf8");
    data = JSON.parse(data);
    delete data.nextId;
    res.send(data);
    logger.info(`Get /account `);
    } catch (err) {
      res.status(400).send({ error: err.message });
      logger.error(`GET /account - ${err.message}`)
    }
});

router.get("/:id", async (req, res) => {
  try {
    let data = await readFile(file, "utf8");
    data = JSON.parse(data);
    const account = data.accounts.find(user => user.id === parseInt(req.params.id, 10))
    if(account) {
      res.send(account)
    } else {
      res.end();
    }
    logger.info(`Get /account/id `);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Get /account/id - ${err.message}`)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    let data = await readFile(file, "utf8")
    let json = JSON.parse(data);
    let accounts = json.accounts.filter(account => account.id !== parseInt(req.params.id, 10))

    json.accounts = accounts;

    await writeFile(file, JSON.stringify(json));
    res.end();
    logger.info(`delete /account/id  ${req.params.id} `);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Delete /account/id - ${err.message}`)
  }
})

router.put("/", async (req, res) => {
  try {
    let newAccount = req.body;
    let data = await readFile(file, "utf8");
    let json = JSON.parse(data);
    let oldIndex = json.accounts.findIndex(account => account.id === newAccount.id);

    json.accounts[oldIndex].name = newAccount.name;
    json.accounts[oldIndex].balance = newAccount.balance;

    await writeFile(file, JSON.stringify(json))

    res.end();
    logger.info(`Put /account/  ${json.accounts[oldIndex].name}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Put /account - ${err.message}`)
  }
})
router.post("/transaction", async (req, res) => {
  try {
    let newAccount = req.body;
    let data = await readFile(file, "utf8")
    let json = JSON.parse(data);
    let Index = json.accounts.findIndex(account => account.id === newAccount.id);
    json.accounts[Index].balance += newAccount.balance;
    if((newAccount.balance < 0) && ((json.accounts[Index].balance + newAccount.balance) < 0)) {
      throw new Error("Não há saldo suficiente");
    }
    await writeFile(file, JSON.stringify(json));
    res.send(json.accounts[Index]);
    res.end();
    logger.info(`Put /account/transaction  ${json.accounts[Index].balance}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`post /account/transaction - ${err.message}`)
  }
})

//module.exports = router
export default router;