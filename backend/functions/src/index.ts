import * as functions from "firebase-functions";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { entryRouter } from "./routes/EntryRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', entryRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

export const api = functions.https.onRequest(app);

