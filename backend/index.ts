import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import rootRouter from "./routes/index"
import firstStart from './utils/firstStart';
import { setSecurityHeaders } from './middlewares/setSecurityHeaders';

dotenv.config();
const IP = process.env.IP || '127.0.0.1'

async function connectDb () {
  console.log(process.env.DB_URL);
  try {
    await mongoose.connect(process.env.DB_URL as string)
    console.log('✅ DB connected');
    await firstStart()
  } catch (error) {
    console.log("❌ DB connection error")
    console.log(error);
  }
}

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}))
app.use(setSecurityHeaders)
app.use('/api', rootRouter)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// @ts-ignore: Unreachable code error
app.listen(port, IP, async () => {
  try {
    await connectDb()
    console.log(`✅ Server is running at http://${IP}:${port}`);
  } catch (error) {
    console.log('❌ App crashed');
  }
});