import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => res.json({msg: "hello, 🌍"}))
app.use("/api/v1", routes)

app.use(errorHandler);

export default app;