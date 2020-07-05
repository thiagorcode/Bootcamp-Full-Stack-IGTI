const MongoClient = require('mongodb').MongoClient;
const uri =
  "mongodb+srv://dbaserver:servidor123@cluster0.dnlgo.gcp.mongodb.net/dbaserver?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(async (err) => {
  const collection = client.db("finance").collection("insome");
  // perform actions on the collection object
  try {
    // ! Mostrar documents cujo subject seja história.
    const dataBD = await collection.find({ subject: "História" }).toArray()
    console.log(dataBD)

    // Mostrar minhas database
    const databaselist = await client.db().admin().listDatabases();
    console.log("Minhas database: ")
    databaselist.databases.forEach((db) => {
      console.log(` - ${db.name}`)
    })
    console.log("Banco de dados ativo")
    client.close();
  } catch (error) {
    console.log(error)
    client.close();
  }

});
