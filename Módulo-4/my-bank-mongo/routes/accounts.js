import express from "express";
import { accountsModel } from "../models/account.js";

const router = express.Router();
// Depositar valores
router.put("/", async (req, res) => {
  try {
    const { agencia, conta, balance } = req.body

    if (balance <= 0) {
      throw new Error("Digite valores positivos")
    }
    let user = await accountsModel.findOneAndUpdate(
      { agencia: agencia, conta: conta },
      { $inc: { balance: parseInt(balance), } },
      { new: true }
    );
    if (!user) {
      throw new Error("Essa conta ou agência não existe")
    }

    res.status(200).send({ userBalance: user.balance })
    res.end();
    logger.info(`Put / ${conta} Efetuado com sucesso`);

  } catch (err) {

    res.status(400).send({ error: err.message });
    logger.error(`Put / ${err.message}`)
  }
})
// Realizar saque
router.put("/saque", async (req, res) => {
  try {
    let { agencia, conta, balance } = req.body
    let tarife = 1;

    balance += tarife;

    let user = await accountsModel.findOneAndUpdate(
      { agencia: agencia, conta: conta },
      { $inc: { balance: -balance } },
      { new: true }
    )
    if (!user) {
      throw new Error("Essa conta ou agência não existe")
    }
    res.send(`
      Para todos saques cobramos R$ ${tarife} de tarifa.
      Seu novo saldo é: ${user.balance}
    `)

    res.end();
    logger.info(`Put /account/ ${conta} Efetuado com sucesso`);

  } catch (err) {

    res.status(400).send({ error: err.message });
    logger.error(`Put /account - ${err.message}`)
  }
});
// Consultar saldo
router.get("/over/:agency/:account", async (req, res) => { // Refatorar usando o body
  try {
    const { agency, account } = req.params;
    let user = await accountsModel.findOne({ agencia: agency, conta: account })
    if (!user) {
      throw new Error(false)
    }

    res.send(`Olá ${user.name}, Seu saldo é: ${user.balance}`);
    res.end()
    logger.info(`Get over ${user.name}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`GET over - ${err.message}`)
  }
});

router.delete("/:agencia/:conta", async (req, res) => {// Refatorar usando o body
  try {
    const { agencia, conta } = req.params;
    await accountsModel.deleteOne({ agencia, conta });

    const quantdAgency = await accountsModel.find({ agencia })


    res.send(`Agora existem ${quantdAgency.length} contas na Agéncia ${agencia}.`)
    res.end();
    logger.info(`delete /account/delete  ${req.params.conta} `);
  } catch (err) {

    res.status(400).send({ error: err.message });
    logger.error(`Delete /account/id - ${err.message}`)
  }
})


router.put('/transfer', async (req, res) => {
  try {
    const { contaOrigem, contaDestino, transfer } = req.body;
    let tarifa = 8

    let origin = await accountsModel.findOne({ conta: contaOrigem })

    if (!origin) {
      throw new Error("A conta origem não existe")
    }

    let destiny = await accountsModel.findOne({ conta: contaDestino })
    if (!destiny) {
      throw new Error("A conta Destino não existe")
    }

    if (origin.agencia !== destiny.agencia) {
      origin.balance -= tarifa
    }

    origin.balance -= transfer;
    destiny.balance += transfer;

    origin.save(); // validação funcionou aqui.
    destiny.save();

    res.send(origin);
    res.end();

    logger.info(`POST /transfer - `)
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Post /account - ${err.message}`)
  }
});


router.get("/:number", async (req, res) => {// Refatorar usando o body
  try {
    let { number } = req.params;

    let income = await accountsModel.aggregate(
      [{
        $project:
        {
          _id: 0,
          agencia: 1,
          conta: 1,
          balance: 1,
        }
      },
      {
        $sort: { balance: 1 }
      }, {
        $limit: parseInt(number)
      }
      ]);
    res.send(income)
    res.end();

    logger.info(`Executado o rankeamento `);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Get  - ${err.message}`)
  }
})


router.get("/search/param/:agency", async (req, res) => {// Refatorar usando o body
  try {
    const { agency } = req.params;

    let balanceMed = await accountsModel.aggregate([{ $project: { _id: 0, balance: 1, agencia: 1, conta: 1 } },
    {
      $match: {
        agencia: parseInt(agency)
      }
    },
    {
      $group: {
        _id: "$agencia",
        avgAmount: { $avg: "$balance" } /* Soma todos os valores pesquisado e dar a média dentro 
        de avgAmount */
      }
    }
    ])


    res.send(balanceMed);
    res.end();
    logger.info(`Put /account/transaction  `);
  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Get search - ${err.message}`)
  }
})

router.get("/client/:number", async (req, res) => {// Refatorar usando o body
  try {
    const { number } = req.params;
    let user = await accountsModel.aggregate(
      [{
        $project:
        {
          _id: 0,
          agencia: 1,
          conta: 1,
          balance: 1,
          name: 1,
        }
      },
      {
        $sort: { balance: -1, name: 1 }
      }, {
        $limit: parseInt(number)
      }
      ]);
    res.send(user)
    res.end();


  } catch (error) {
    res.status(400).send({ error: err.message });
    logger.error(`Get search - ${err.message}`)
  }

})


router.post("/private", async (req, res) => {

  try {
    const privateAcc = await accountsModel.distinct("agencia")
    const newAgency = 99
    // Fazer verificação se existe clientes private e caso exista e não seja o que tem mais balance da agencia tirar do private

    privateAcc.map(async (agency) => {
      const clientPrivate = await accountsModel.find({ agencia: agency })
        .sort({ balance: -1, name: 1 }).limit(1)
      clientPrivate[0].agencia = newAgency
      await clientPrivate[0].save();

    })

    //   const updatePrivate = await accountsModel.findOneAndUpdate(
    //     { conta: clientPrivate[0].conta, nome: clientPrivate[0].nome },
    //     { agencia: 99 },
    //     { new: true }
    //   )
    // }
    const listAccPrivate = await accountsModel.find({ agencia: 99 })

    res.status(200).send({ acc: listAccPrivate })
    res.end();

  } catch (err) {
    res.status(400).send({ error: err.message });
    logger.error(`Get search - ${err.message}`)
  }

})


//module.exports = router
export default router;