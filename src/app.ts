import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json())

app.get("/", (req, res) => res.json({msg: "hello, 🌍"}))
app.use("/api/v1", routes)

export default app;