import * as express from 'express';
import { averagePrice } from './controllers/average_price';

const app = express();

app.get('/average_price?:sym', averagePrice);

app.listen(3000);
