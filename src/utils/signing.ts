import * as crypto from 'crypto';
import * as qs from 'querystring';

const { BINANCE_SECRET } = process.env

interface SignedRequest {
  querystring: string;
  signature: string;
}

function signRequest(payload): SignedRequest {
  const querystring = qs.stringify(payload);
  return { 
    querystring, 
    signature: crypto
                  .createHmac('SHA256', BINANCE_SECRET)
                  .update(querystring)
                  .digest('hex')
  };
}

export { signRequest };
