const express = require('express');
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json()); 

const db = mysql.createConnection({
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,  
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_DATABASE,  
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

app.listen(3000, () => {
    console.log('server is running on port 3000')
})