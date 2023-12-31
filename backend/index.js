const express = require("express");
const cors = require("cors");
const pg = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();
app.use("/api/tasks", router);

const db = new pg.Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

app.get("/favicon.ico", function (req, res) {
  res.status(204);
  res.end();
});

router.get("/", async (req, res) => {
  const pgsql = "SELECT * from public.tasks";
  db.query(pgsql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(data.rows);
  });
});

router.post("/create", async (req, res) => {
  const pgsql =
    "INSERT INTO public.tasks (task, is_complete) VALUES ($1, $2) RETURNING *";
  const values = [req.body.task, req.body.is_complete];
  db.query(pgsql, values, (err, data) => {
    if (err) return res.status(500).json("Error", err.message);
    return res.status(200).json(data.rows);
  });
});

router.put("/updatetask/:id", async (req, res) => {
  const id = req.params.id;
  const pgsql = "UPDATE public.tasks SET task = $1 WHERE ID = $2 RETURNING *";
  const values = [req.body.task];
  db.query(pgsql, [...values, id], (err, data) => {
    if (err) return res.json("Error", err.message);
    return res.json(data.rows[0]);
  });
});

router.put("/updatestatus/:id", async (req, res) => {
  const id = req.params.id;
  const pgsql =
    "UPDATE public.tasks SET is_complete = $1 WHERE ID = $2 RETURNING *";
  const values = [req.body.is_complete];
  db.query(pgsql, [...values, id], (err, data) => {
    if (err) return res.json("Error", err.message);
    return res.json(data.rows[0]);
  });
});

router.delete("/tasks/:id", async (req, res) => {
  const pgsql = "DELETE FROM public.tasks WHERE ID = $1 RETURNING ID";
  const id = req.params.id;

  db.query(pgsql, [id], (err, data) => {
    if (err) return res.json("ERROR:", err);
    return res.json(data.rows[0]);
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Listening to port " + process.env.PORT);
});

module.exports = app;
