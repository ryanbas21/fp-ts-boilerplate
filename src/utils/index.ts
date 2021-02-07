import { Request } from 'express';

function handleQueryParams(req: Request) {
  if (!Array.isArray(req.query)) {
    return req.query.symbol;
  } else {
    return req.query.includes('symbol') && req.query.filter(symbol => symbol === 'sym')[0];
  }
}

export { handleQueryParams };