import express from "express";
import moment from "moment";
import {promises} from "fs";
import {inserirLancamento} from "../controllers/lancamentosController.js";
import calc from "../libs/calculos.js";

const {writeFile, readFile} = promises;
const router = express.Router();

router.get("/totalMes/:mes", async (req, res) => {    
    const numeros = [1, 2, 3, 4, 5, 6, 7];
    /*numeros.forEach(async x => {
        console.log(await calc.teste(x));
    });*/
    for (const x of numeros) {
        console.log(await calc.teste(x));        
    }
    /*for (let i = 0; i < numeros.length; i++) {
        console.log(await calc.teste(numeros[i]));                
    }*/


    const json = JSON.parse(await readFile(global.fileName));
    let lancamentos = json.lancamentos.filter(lancamento => {
        console.log(lancamento);
        const mes = moment(lancamento.data, "DD/MM/YYYY").month() + 1;
        return mes === parseInt(req.params.mes);
    });    
    lancamentos = lancamentos.map(lancamento => {
        return lancamento.valor;
    });
    res.send({valor: calc.somatorio(lancamentos)});
});

router.post("/receita", async (req, res) => {    
    const lancamento = req.body;
    res.send(await inserirLancamento(lancamento));
});

router.post("/despesa", async (req, res) => {
    const lancamento = req.body;    
    res.send(await inserirLancamento(lancamento, "D"));
});

export default router;