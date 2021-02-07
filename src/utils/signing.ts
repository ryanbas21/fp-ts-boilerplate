import * as crypto from 'crypto';
import * as qs from 'querystring';

const { BINANCE_SECRET } = process.env

function signRequest(payload): string {
  const querystring = qs.stringify(payload);
  return crypto
          .createHmac('SHA256', BINANCE_SECRET)
          .update(querystring)
          .digest('hex')
}

export { signRequest };