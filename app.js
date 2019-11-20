const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const cors = require("cors");
const jsonParser = express.json();
app.use(cors());

const userScheme = new Schema(
  { name: String, age: Number },
  { versionKey: false }
);
const Hero = mongoose.model("Hero", userScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect(
  "mongodb://localhost:27017/usersdb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
    });
  }
);

app.get("/api/heroes", function (req, res) {
  Hero.find({}, function (err, heroes) {
    if (err) return console.log(err);
    res.send(heroes);
  });
});
app.get("/api/heroes/:id", function (req, res) {
  console.log(req.params.id);
  const id = req.params.id;
  Hero.findOne({ _id: id }, function (err, hero) {
    if (err) return console.log(err);
    res.send(hero);
  });
});

app.post("/api/heroes", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const heroName = req.body.name;
  const hero = new Hero({ name: heroName });

  hero.save(function (err) {
    if (err) return console.log(err);
    res.send(hero);
  });
});

app.delete("/api/heroes/:id", function (req, res) {
  const id = req.params.id;
  Hero.findByIdAndDelete(id, function (err, hero) {
    if (err) return console.log(err);
    res.send(hero);
  });
});

app.put("/api/heroes", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const _id = req.body._id;
  const heroName = req.body.name;
  const newHero = { name: heroName };

  Hero.findByIdAndUpdate({ _id: _id }, newHero, { new: true }, function (
    err,
    hero
  ) {
    if (err) return console.log(err);
    res.send(hero);
  });
});
