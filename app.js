const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(express.json())
//This is added to avoid cors error while using live server extension
app.use(cors());
dotenv.config({
  path: "./.env",
});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connection Success");
  }
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);

// Puppeteer and Express API route
app.post('/predict', async (req, res) => {
  console.log(req.body.imageUrl);
  const itemName = await scrape(req.body.imageUrl);
  res.send({results:itemName});
  res.end();
});

async function scrape(imageUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://lens.google.com/uploadbyurl?url=${imageUrl}`);
  const links = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('span.LzliJc'));
    return elements.map(element => element.innerText.trim());
  });
  console.log(links);
  console.log("the food name is",links);
  await browser.close();
  return links
}

// Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server Started @ Port 5000");
});
