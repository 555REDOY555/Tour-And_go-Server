const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');

//MiddeleWare
require('dotenv').config()
const cors = require("cors")
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.to6vq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(client)


async function run() {
     try {
          await client.connect();
          console.log("data base connect successfuly ")
          const database = client.db("Assignment-11");
          const servisesCollection = database.collection("Servises");

          //GEI API
          app.get('/servises', async (req, res) => {
               const cursor = servisesCollection.find({});
               products = await cursor.toArray();
               res.send(products)
          });



     }
     finally {

     }
}
run().catch(console.dir)


app.get('/', (req, res) => {
     res.send('Hello World!')
})

app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
})