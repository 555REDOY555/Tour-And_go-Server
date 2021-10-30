const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.to6vq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

     try {
          await client.connect();
          // console.log("hi db")
          const database = client.db("Assignment-11");
          const serviseCllection = database.collection("Servises");
          const orderCollection = database.collection("order")



          // GET API 

          app.get('/Servises', async (req, res) => {
               const cursor = serviseCllection.find({});
               const services = await cursor.toArray();
               res.send(services);

          })
          app.get('/order', async (req, res) => {
               const cursor = serviseCllection.find({});
               const services = await cursor.toArray();
               res.send(services);

          })


          // GET Single Service   no


          app.get('/Servises/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };
               const user = await serviseCllection.findOne(query);
               // console.log('load user with id: ', id);
               res.send(user);
          })

          // POST API 
          app.post('/Servises', async (req, res) => {
               const Service = req.body;
               console.log('hit the post api', Service);

               const result = await serviseCllection.insertOne(Service);
               console.log(result);
               res.json(result)
          });
          app.post('/order', async (req, res) => {
               const order = req.body;
               console.log('hit the post api', order);

               const result = await orderCollection.insertOne(order);
               console.log(result);
               res.json(result)
          });


          //add order 


          // DELETE API

          app.delete('/Servises/:id', async (req, res) => {
               const id = req.params.id;
               const query2 = { _id: ObjectId(id) };

               const result = await serviseCllection.deleteOne(query2);

               console.log('deleting user with id ', result);

               res.json(result);
          })
     }
     finally {
          // await client.close();
     }

}


run().catch(console.dir);


app.get("/", (req, res) => {
     res.send("hi there")
})


app.listen(port, () => {
     console.log("I am in port", port)
})