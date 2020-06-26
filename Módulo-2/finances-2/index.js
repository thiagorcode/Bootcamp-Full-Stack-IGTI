import express from "express";
import {promises} from "fs";
import lancamentosRouter from "./routes/lancamentos.js";

const {writeFile, readFile} = promises;
global.fileName = "lancamentos.json";

const app = express();
app.use(express.json());
app.use("/lancamentos", lancamentosRouter);

app.listen(3000, async () => {
    try {
        const initialJson = {
            nextId: 1,
            lancamentos: []
        };
        await writeFile(global.fileName, JSON.stringify(initialJson), {flag: "wx"});
    } catch (err) {
    }
    console.log("API Started");
});