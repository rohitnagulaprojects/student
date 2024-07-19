const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const dburl = "mongodb+srv://rohitkumarnagula:nwHAISOGpHceQTm4@cluster0.9u1al14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const app = express();
app.use(cors());
app.use(express.json());
app.delete("/delete",(req,res)=>{
    const url = dburl;
    const client = new MongoClient(url);
    const db = client.db("Student");
    const coll = db.collection("student");
    const doc = {"_id":req.body.rollno};
    coll.deleteOne(doc)
    .then(result => {res.send(result);
        console.log(result);
    })
    .catch(err => {res.send(err);
        console.log(err);

    });
});
app.put("/update",(req,res)=>{
    const url = dburl;
    const client = new MongoClient(url);
    const db = client.db("Student");
    const coll = db.collection("student");
    let doc = { "name":req.body.name, "marks": req.body.marks};
    const filter = {"_id":req.body.rollno};
    coll.updateOne(filter,{"$set":doc})
    .then(result => {res.send(result);
        console.log(result);
    })
    .catch(err => {res.send(err);
        console.log(err);

    });
});
app.post("/save",(req,res)=>{
    let url = dburl;
    const client = new MongoClient(url);
    let db = client.db("Student");
    let coll = db.collection("student");
    let doc = {"_id":req.body.rollno, "name":req.body.name, "marks": req.body.marks};
    coll.insertOne(doc)
    .then(result => {res.send(result);
        console.log(result);
    })
    .catch(err => {res.send(err);
        console.log(err);

    });
});

app.get("/get",(req,res)=>{
    let url = dburl;
    const client = new MongoClient(url);
    let db = client.db("Student");
    let coll = db.collection("student");
    coll.find({}).sort("_id",1).toArray()
    .then(result => {res.send(result);
        console.log(result);
    })
    .catch(err => {res.send(err);
        console.log(err);

    });
});

app.listen(9002,()=>{console.log("ready @9002");});