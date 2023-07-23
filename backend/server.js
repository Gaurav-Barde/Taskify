const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6634443",
  password: "mgMUcGYdBL",
  database: "sql6634443",
});

app.get("/", (req, res) => {
  const sql = "SELECT * from tasks";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error:", err.message);
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO tasks (`task`, `isComplete`) VALUES (?)";
  const values = [req.body.task, req.body.isComplete];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json("Error", err.message);
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  console.log("Update Request: ", req);
  const sql = "UPDATE tasks set `task` = ? WHERE ID = ? ";
  const values = [req.body.task];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json("Error", err);
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

app.listen(8080, () => {
  console.log("Listening to Port 8080");
});