import { Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import { handleQueryParams } from '../utils';
import { averagePrice } from './average_price';

const TestOrder = '/api/v3/order/test';
type SIDE = 'BUY' | 'SELL';
type OrderType = 'LIMIT' | 'STOP' | 'MARKET' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT';
/*
 * GTC = Good Till Canceled orders are effective until they are executed or canceled.
 * IOC (Immediate or Cancel) Enumerator<string>;
 * FOK (Fill or Kill) orders fills all in its entirety, otherwise, the entire order will be cancelled.
 */

type TimeInForce = 'GTC' | 'IOC' | 'FOK';

interface OrderRequest {
  symbol: string;
  side: SIDE;
  type: OrderType;
  timeInForce?: TimeInForce;
  quantity?: number;
  quoteOrderQty?: number;
  price?: number;
  newClientOrderId?: string
  stopPrice?: number;
  icebergQty?: number;
  newOrderRespType?: Enumerator<string>
  recvWindow?: number;
  timestamp: number;

}
async function calculateQuantity(req: Request, res: Response) {
  const dollarAmount = 10;
  return pipe(
    averagePrice(req, res),
    T.of,
    T.map((data) => {
      console.log(data);
      return Math.floor(dollarAmount / 10);
    }),
  )(); 
}

async function createOrder(req: Request, res: Response) {
  const symbol = handleQueryParams(req);
  console.log(symbol);
  const quantity = await calculateQuantity(req, res);
  console.log(quantity);
  const order = {
    symbol,
    side: 'GTC',
    type: 'MARKET',
    quantity: calculateQuantity(req, res),
  }; 
}

export { createOrder };