const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotevn = require("dotenv");
const ejs = require("ejs");
const Url = require("./models/urlSchem.js");
const port = process.env.PORT || 8000;
dotevn.config({ path: "./.env" });
app.use(express.json());
const DB = process.env.DB;
app.use(
  express.urlencoded({
    extended: true,
  })
);
mongoose
  .connect(DB)
  .then(() => console.log("connected successfull"))
  .catch((error) => console.log(error));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const data = await Url.find();
  res.render("index", {
    data: data,
  });
});

app.post("/shorturls", async (req, res) => {
  const data = await new Url({ fullUrl: req.body.fullUrl });
  await data.save();
  res.redirect("/");
});

app.get("/:shorturl", async (req, res) => {
  const data = await Url.findOne({ shortUrl: req.params.shorturl });
  if (!data) return console.log("not data");
  data.click++;
  data.save();
  res.redirect(data.fullUrl);
});

app.listen(port, () => {
  console.log(`on port:${port}`);
});
