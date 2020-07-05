import mongoose from 'mongoose';

//Conectar ao MongoDB pelo Mongoose
(async () => {
   try {
      await mongoose.connect(
         'mongodb+srv://dbaserver:servidor123@cluster0.dnlgo.gcp.mongodb.net/dbaserver?retryWrites=true&w=majority',
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         }
      );
   } catch (error) {
      console.log('Erro ao conectar no MongoDB');
   }
})();

//criacao do modelo
const studentSchema = mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   subject: {
      type: String,
      require: true,
   },
   type: {
      type: String,
      require: true,
   },
   value: {
      type: Number,
      require: true,
   },
   lastModified: {
      type: Date,
      default: Date.now,
   },
});

//definindo o modelo da colecao
mongoose.model('insome', studentSchema, 'insome');

//criacao de um objeto
const insome = mongoose.model('insome');

new insome({
   name: 'Thiago Rodrigues',
   subject: 'Node.js',
   type: 'Trabalho Pratico',
   value: 30,
})
   .save()
   .then(() => console.log('Documento inserido'))
   .catch((err) => console.log('Falha ao inserir o documento'));

