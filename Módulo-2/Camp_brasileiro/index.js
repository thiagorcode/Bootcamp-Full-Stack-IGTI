import express from "express";
import { promises } from "fs";
import timesRouter from "./routes/times.js";
const { readFile, writeFile } = promises;
const port = 3000;

const times = [];

//criando instancia do express
const app = express();

//definindo express para usar json
app.use(express.json());

//criando roteador /times para redirecionar requisicoes
app.use("/times", timesRouter);

//iniciando servidor
app.listen(port, () => {
    console.log("API Started");
});

init();

async function init() {
    try {
        const resp = await readFile("./2003.json");        
        const data = JSON.parse(resp);

        //montando array de times
        data[0].partidas.forEach(partida => {
            times.push({ time: partida.mandante, pontuacao: 0 });
            times.push({ time: partida.visitante, pontuacao: 0 });
        });

        //preenchendo pontuacao dos times no array
        data.forEach(rodada => {
            rodada.partidas.forEach(partida => {
                const indexVisitante = times.findIndex(item => item.time === partida.visitante);                    
                const indexMandante = times.findIndex(item => item.time === partida.mandante);                                    

                let timeVisitante = times[indexVisitante];
                let timeMandante = times[indexMandante];

                if (partida.placar_visitante > partida.placar_mandante) {                                        
                    timeVisitante.pontuacao += 3;
                    times[indexVisitante] = timeVisitante;
                } else if (partida.placar_mandante > partida.placar_visitante) {                                    
                    timeMandante.pontuacao += 3;
                    times[indexMandante] = timeMandante;                    
                } else {
                    timeVisitante.pontuacao += 1;
                    timeMandante.pontuacao += 1;
                    times[indexVisitante] = timeVisitante;                                        
                    times[indexMandante] = timeMandante;                    
                }
            });
        });

        //ordenar times de acordo com a pontuacao
        times.sort((a, b) => {
            return b.pontuacao - a.pontuacao;
        });

        await writeFile("times.json", JSON.stringify(times));
    } catch (err) {
        console.log(err);
    }
}