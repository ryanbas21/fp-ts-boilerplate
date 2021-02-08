import { Request } from 'express';

function handleQueryParams(req: Request) {
  if (!Array.isArray(req.query)) {
    return req.query.sym;
  } 
  return req.query.includes('sym') && req.query.filter(symbol => symbol === 'sym')[0];
}

export { handleQueryParams };
