import crypto from 'crypto';

const { BINANCE_SECRET } = process.env

function signRequest(): string {
  const time = Date.now();
  const query_string = `timestamp=${time}`;
  return crypto
          .createHmac('sha256', BINANCE_SECRET)
          .update(query_string)
          .digest('hex')
}