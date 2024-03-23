import express, { Router } from 'express';
import config from '../config/index.js';
import loader from './loader/index.js';

async function startServer() {
  const app = express();

  await loader({ expressApp: app });
  
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

startServer();