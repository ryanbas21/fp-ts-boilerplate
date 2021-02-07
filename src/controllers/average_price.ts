import { Request, Response } from "express";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { ParsedQs } from 'qs';
import axios, { AxiosResponse } from "axios";
import { absurd, identity, pipe } from "fp-ts/lib/function";
import { handleQueryParams } from '../utils';

const { basename } = process.env;

async function getPrice(sym: string | ParsedQs) {
  return axios.get(`${basename}/api/v3/avgPrice?symbol=${sym}`)
}

export async function averagePrice(req: Request, res: Response) {
  return pipe(
    handleQueryParams(req),
    (sym) => TE.tryCatch(
      async () => getPrice(sym),
      (e: Error) => new Error('invalid call ' + e.message),
    ),
    TE.map((resp: AxiosResponse) => resp.data)
  )();
}

export function handleAveragePrice(req: Request, res: Response) {
  return pipe(
    async () => averagePrice(req, res),
    TE.fold(
      absurd,
      data => T.of(res.send(data))
    ),
  )();
}