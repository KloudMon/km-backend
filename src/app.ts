import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => res.json({msg: "hello, 🌍"}))
app.use("/api/v1", routes)

export default app;