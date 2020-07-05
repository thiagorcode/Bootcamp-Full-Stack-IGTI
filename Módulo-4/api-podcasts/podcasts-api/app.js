import express from 'express';

import { podcastRouter } from './routes/podcastRouter.js';

import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado no banco de dados com sucesso');
  } catch (error) {
    console.log('Erro ao conectar no banco de dados');
  }
})();

const app = express();

app.use(express.json());
app.use(podcastRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT, () => {
  console.log('Servidor em execucao na porta 3000');
});
