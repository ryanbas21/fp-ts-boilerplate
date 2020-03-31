import { Application } from 'express';
import { createApplication } from './app';

const app: Application = createApplication();

const { APP_PORT = 8000 } = process.env;

app.listen(APP_PORT, () => {
  console.log(`App listening on the port: ${APP_PORT}`);
});
