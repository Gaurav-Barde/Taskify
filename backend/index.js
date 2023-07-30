const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.get("/favicon.ico", function (req, res) {
  res.status(204);
  res.end();
});

app.get("/", async (req, res) => {
  // const sql = "SELECT * from tasks";
  // db.query(sql, (err, data) => {
  //   if (err) return res.status(500).json("Error:", err.message);
  //   return res.status(200).json(data);
  // });
  const data = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(data.data);
  return res.status(200).json(data.data);
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO tasks (`task`, `isComplete`) VALUES (?)";
  const values = [req.body.task, req.body.isComplete];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error", err.message);
    return res.json(data);
  });
});

app.put("/updatetask/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE tasks SET `task` = ? WHERE ID = ? ";
  const values = [req.body.task];
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error", err.message);
    return res.json(data);
  });
});

app.put("/updatestatus/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE tasks SET `isComplete` = ? WHERE ID = ? ";
  const values = [req.body.isComplete];
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error", err.message);
    return res.json(data);
  });
});

app.delete("/tasks/:id", (req, res) => {
  const sql = "DELETE FROM tasks WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json("ERROR:", err);
    return res.json(data);
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Listening to Port 8080:");
});

module.exports = app;
