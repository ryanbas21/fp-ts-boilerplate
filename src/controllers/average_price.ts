import { Request, Response } from "express";
// import { encaseP, fork } from 'fluture';
// import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
// import * as T from "fp-ts/lib/Task";
import axios, { AxiosResponse } from "axios";

const {basename} = process.env;

// const get = encaseP(axios.get);
function getPrice(sym: any): TE.TaskEither<any, Promise<AxiosResponse<any>>> {
  return TE.of(axios.get(`${basename}/api/v3/avgPrice?symbol=${sym}`));
}

function averagePrice(req: Request, res: Response) {
  const { sym } = req.query;
  getPrice(sym).fold(console.error, console.log);
  res.send(data);
  
}

export { averagePrice };
