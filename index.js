const exprees = require("express");

const { MongoClient } = require('mongodb');

const ObjectId = require("mongodb").ObjectId

const cors = require("cors")

require('dotenv').config()

const app = exprees();

const port = process.env.PORT || 7000;;


// cors

app.use(cors());
app.use(exprees.json());


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

          app.get('/servises', async (req, res) => {
               const carsor = serviseCllection.find({});
               const servises = await carsor.toArray();
               res.send(servises)
          })



          app.get('/servises/:id', async (req, res) => {
               const id = req.params.id;
               console.log('hitting id ', id)
               const query = { _id: ObjectId(id) };

               const allData = await serviseCllection.insertOne(query);

               res.json(allData)

          })

          // POST API 

          app.post("/servises", async (req, res) => {

               const servise = req.body
               console.log("hitting", servise);

               const result = await serviseCllection.insertOne(servise);

               console.log(result)

               res.json(result)
          })


          //add order 
          app.post('/order', (req, res) => {
               // const order = req.body

               orderCollection.insertOne(req.body).then((result, err) => {
                    if (err) {
                         res.send(err)
                    }
                    else {
                         res.send(result)
                    }
               })



          })


          //get my order 
          app.get('/MyOrder/:email', async (req, res) => {
               console.log(req.params.email);
               const order = await orderCollection.find({ email: req.params.email }).toArray()
               res.send(order);
          })

          // DELETE API

          app.delete('/delete/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };

               const result = await orderCollection.deleteOne(query);

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