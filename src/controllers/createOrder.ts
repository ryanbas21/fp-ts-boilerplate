import axios from 'axios';
import { Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/pipeable';
import { sequenceT } from 'fp-ts/lib/Apply'
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { signRequest } from '../utils/signing';
import { handleQueryParams } from '../utils';
import { averagePrice } from './average_price';

const { basename, BINANCE_API } = process.env;
const request = axios.create({
  baseURL: basename,
  headers: {
   'X-MBX-APIKEY': BINANCE_API,
  },
});
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
async function calculateQuantity(req: Request) {
  const dollarAmount = 10;
  return pipe(
    averagePrice(req),
    T.of,
    T.map(() => Math.floor(dollarAmount / 1)),
  )(); 
}

async function createOrder(req: Request) {
  const serverTime = TE.tryCatch(
    async () => axios.get("https://api.binance.com/api/v1/time"),
    () => new Error('Error getting server time'),
    )
  const getQuantity = TE.tryCatch(
    async () => calculateQuantity(req),
    err => new Error('Error getting quantity'),
  );
  const getQueryParams = TE.tryCatch(
    async () => handleQueryParams(req),
    err => new Error('error handling query params'),
  );
  
  return pipe(
    TE.tryCatch(
      async () => sequenceT(TE.taskEither)(serverTime, getQuantity, getQueryParams),
      (err: Error) => new Error(err.message),
    ),
    console.log
    // TE.map(({serverTime: timestamp}) => timestamp),
  )

  // const symbol = handleQueryParams(req);
  // console.log(symbol)
  // const { serverTime: timestamp }: { serverTime: number } = await axios.get("https://api.binance.com/api/v1/time").then(({ data }) => data);

  // const quantity = 

  // const order = {
  //   symbol,
  //   side: 'BUY',
  //   type: 'MARKET',
  //   timestamp,
  //   quantity,
  // };

  // const { querystring, signature } = signRequest(order);

  // await request.post(`${basename}${TestOrder}?${querystring}&signature=${signature}`)
  //   .then(console.log)
  //   .catch(err => console.log(err))
}

export { createOrder };
