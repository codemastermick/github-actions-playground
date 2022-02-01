import dotenv from 'dotenv-safe';
try {
  dotenv.config({
    example: '.env.example'
  });
} catch (error) {
  throw error;
}

import express from 'express';
import * as http from 'http';

const APP_NAME = process.env.APP_NAME as string;
const PORT = process.env.PORT as string;

const app: express.Application = express();
const server: http.Server = http.createServer(app);

const runningMessage = `Test server running at http://localhost:${PORT}`;
app.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

app.get(/^(.*)$/, function (req, res, next) {
  res.status(404).send({
    message: `Could not find any resource at ${req.headers.host}${req.url}`
  });
});

export default server;

server.listen(PORT, () => {
  console.debug(runningMessage);
});
