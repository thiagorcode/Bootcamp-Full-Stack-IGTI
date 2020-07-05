import express from "express";
import { accountsModel } from "../models/account.js";

const router = express.Router();


router.put("/", async (req, res) => {
  try {
    const { agencia, conta, balance } = req.body

    let user = await accountsModel.findOneAndUpdate({ agencia: agencia, conta: conta }, { balance: balance }, { new: true })
    console.log(user)




    res.end();
    logger.info(`Put /account/ ${conta} Efetuado com sucesso`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Put /account - ${err.message}`)
  }
})

router.post('/', async (req, res) => {

  try {


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

    res.send(data);
    logger.info(`Get /account `);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET /account - ${err.message}`)
  }
});

router.get("/:id", async (req, res) => {
  try {

    res.send(account)
    res.end();
    logger.info(`Get /account/id `);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Get /account/id - ${err.message}`)
  }
})

router.delete("/:id", async (req, res) => {
  try {

    await writeFile(file, JSON.stringify(json));
    res.end();
    logger.info(`delete /account/id  ${req.params.id} `);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Delete /account/id - ${err.message}`)
  }
})


router.post("/transaction", async (req, res) => {
  try {

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