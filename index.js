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

          app.get('/order', async (req, res) => {
               const cursor = orderCollection.find({});
               const order = await cursor.toArray();
               res.send(order);

          })
          app.get('/Servises', async (req, res) => {
               const cursor = serviseCllection.find({});
               const services = await cursor.toArray();
               res.send(services);

          })


          // GET Single Service   no


          app.get("/order/:id", (req, res) => {
               console.log(req.params.id);
               orderCollection
                    .find({ _id: ObjectId(req.params.id) })
                    .toArray((err, results) => {
                         res.send(results[0]);
                    });
          });
          app.get("/Servises/:id", (req, res) => {
               console.log(req.params.id);
               serviseCllection
                    .find({ _id: ObjectId(req.params.id) })
                    .toArray((err, results) => {
                         res.send(results[0]);
                    });
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
          //update product
          app.put("/update/:id", async (req, res) => {
               const id = req.params.id;
               const updatedName = req.body;
               const filter = { _id: ObjectId(id) };

               productsCollection
                    .updateOne(filter, {
                         $set: {
                              name: updatedName.name,
                         },
                    })
                    .then((result) => {
                         res.send(result);
                    });
          });

          // get all order by email query

          app.get("/myOrders/:email", (req, res) => {
               console.log(req.params);
               orderCollection
                    .find({ email: req.params.email })
                    .toArray((err, results) => {
                         res.send(results);
                    });
          });

          // DELETE API

          app.delete('/Servises/:id', async (req, res) => {
               const id = req.params.id;
               const query2 = { _id: ObjectId(id) };

               const result = await serviseCllection.deleteOne(query2);

               console.log('deleting user with id ', result);

               res.json(result);
          })
          app.delete("/order/:id", async (req, res) => {
               console.log(req.params.id);

               orderCollection
                    .deleteOne({ _id: ObjectId(req.params.id) })
                    .then((result) => {
                         res.send(result);
                    });
          });
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