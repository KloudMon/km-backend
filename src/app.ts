import express from 'express';

const app = express();

app.get("/", (req, res) => res.json({msg: "hello, 🌍"}))


export default app;