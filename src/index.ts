import * as express from 'express';
import { handleAveragePrice } from './controllers/average_price';
import { createOrder } from './controllers/createOrder';
import './env-loading';

const app = express();

app.get('/average_price?:sym', handleAveragePrice);
app.get('/order?:sym', createOrder);
app.listen(3000);
