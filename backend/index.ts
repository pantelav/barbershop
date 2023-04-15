import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { networkInterfaces } from 'os';
import rootRouter from "./routes/index"
import firstStart from './utils/firstStart';

dotenv.config();

mongoose.connect(process.env.DB_URL as string).then(() => {
  console.log('✅ DB connected');
}).catch(error => {
  console.log("❌ DB connection error")
  console.log(error);
})

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use('/api', rootRouter)



app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// @ts-ignore: Unreachable code error
app.listen(port, async () => {
  await firstStart()
  console.log(`✅ Server is running at http://localhost:${port}`);
});