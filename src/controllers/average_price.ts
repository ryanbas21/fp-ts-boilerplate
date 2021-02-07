import { Request, Response } from "express";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { ParsedQs } from 'qs';
import axios, { AxiosResponse } from "axios";
import { absurd, pipe } from "fp-ts/lib/function";

const { basename } = process.env;

function getPrice(sym: string | ParsedQs) {
  return axios.get(`${basename}/api/v3/avgPrice?symbol=${sym}`)
}
function handleQueryParams(req: Request) {
  if (!Array.isArray(req.query)) {
    return req.query.sym;
  } else {
    return req.query.includes('sym') && req.query.filter(symbol => symbol === 'sym')[0];
  }
}
export async function averagePrice(req: Request, res: Response) {
  return pipe(
    handleQueryParams(req),
    (sym) => TE.tryCatch(
      async () => getPrice(sym),
      (e: Error) => new Error('invalid call ' + e.message),
    ),
    TE.map((resp: AxiosResponse) => resp.data),
    TE.fold(
      absurd,
      (data) => T.of(res.send(data)),
    )
  )();
}
