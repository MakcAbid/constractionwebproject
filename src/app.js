const express = require("express");
const async = require("hbs/lib/async");
const cors = require("cors");
const path = require("path");
require("./db/conn");

const User = require("./models/usermessege");
const Signup = require("./models/signup");
const bcrypt = require("bcryptjs/dist/bcrypt");
const addservice = require("./models/addservice");
const addengineer = require("./models/addengineer");
const publishblog = require("./models/publishblog");

const app = express();
const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname, "../public");
console.log(path.join(__dirname, "../public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));

app.use(cors());
app.use(express.json());

// contact us
app.post("/index", async (req, res) => {
  try {
    // res.send(req.body)
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb://127.0.0.1:27017/saber";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const addserviceCollection = client.db("saber").collection("addservices");
  const addengineerCollection = client.db("saber").collection("addengineers");
  const publishblogCollection = client.db("saber").collection("publishblogs");
  const signupCollection = client.db("saber").collection("signups");

  // signup
  app.post("/signup", async (req, res) => {
    try {
      const password = req.body.password;
      const cpassword = req.body.confirmpassword;
      if (password === cpassword) {
        const userData = new Signup({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: password,
          confirmpassword: cpassword,
        });
        const signuped = await userData.save();
        res.status(201).render("index");
      } else {
        res.send("password are not matched");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/signup", async (req, res) => {
    const cursor = signupCollection.find({});
    const signup = await cursor.toArray();
    res.send(signup);
  });

  //SIGNUPS DELETE BY ID
  app.get("/signup/:id", async (req, res) => {
    try {
      const deletesignup = await signup.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).render("index");
      }
      res.send(deletesignup);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // login
  app.post("/login", async (req, res) => {
    try {
      const email = req.body.username;
      const password = req.body.password;

      const useremail = await Signup.findOne({ email: email });

      const isMatch = await bcrypt.compare(password, useremail.password);

      // if(useremail.password === password){
      if (isMatch) {
        res.status(201).render("index");
      } else {
        res.send("Not matched!");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // addservice
  app.get("/addservice", async (req, res) => {
    const cursor = addserviceCollection.find({});
    const addservice = await cursor.toArray();
    res.send(addservice);
  });

  app.post("/addservice", async (req, res) => {
    try {
      const userData = new addservice(req.body);
      await userData.save();
      res.status(201).render("index");
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // UPDATE SERVICES BY ID
  app.patch("/addservice/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const updateaddservice = await addservice.findByIdAndUpdate(
        _id,
        req.body,
        {
          new: true,
        }
      );
      res.send(updateaddservice);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //SERVICES DELETE BY ID
  app.get("/addservice/:id", async (req, res) => {
    try {
      const deleteaddservice = await addservice.findByIdAndDelete(
        req.params.id
      );
      if (!req.params.id) {
        return res.status(400).render("index");
      }
      res.send(deleteaddservice);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  //addengineer
  app.get("/addengineer", async (req, res) => {
    const cursor = addengineerCollection.find({});
    const addengineer = await cursor.toArray();
    res.send(addengineer);
  });

  app.post("/addengineer", async (req, res) => {
    try {
      const userData = new addengineer(req.body);
      await userData.save();
      res.status(201).render("index");
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // UPDATE SERVICES BY ID
  app.patch("/addengineer/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const updateaddengineer = await addengineer.findByIdAndUpdate(
        _id,
        req.body,
        {
          new: true,
        }
      );
      res.send(updateaddengineer);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //ENGINEERS DELETE BY ID
  app.delete("/addengineer/:id", async (req, res) => {
    try {
      const deleteaddengineer = await addengineer.findByIdAndDelete(
        req.params.id
      );
      if (!req.params.id) {
        return res.status(400).render("index");
      }
      res.send(deleteaddengineer);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // publish blog
  app.get("/publishblog", async (req, res) => {
    const cursor = publishblogCollection.find({});
    const publishblog = await cursor.toArray();
    res.send(publishblog);
  });

  app.post("/publishblog", async (req, res) => {
    try {
      const userData = new publishblog(req.body);
      await userData.save();
      res.status(201).render("index");
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // UPDATE SERVICES BY ID
  app.patch("/publishblog/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const updatepublishblog = await publishblog.findByIdAndUpdate(
        _id,
        req.body,
        {
          new: true,
        }
      );
      res.send(updatepublishblog);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  //PUBLISHBLOGS DELETE BY ID
  app.delete("/publishblog/:id", async (req, res) => {
    try {
      const deletepublishblog = await publishblog.findByIdAndDelete(
        req.params.id
      );
      if (!req.params.id) {
        return res.status(400).render("index");
      }
      res.send(deletepublishblog);
    } catch (e) {
      res.status(500).send(e);
    }
  });
});

// server create
app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
