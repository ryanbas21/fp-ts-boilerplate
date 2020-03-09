import * as cors from 'cors'
import { json as jsonParser } from 'body-parser'

export const jsonMiddleware = jsonParser()
export const corsMiddleware = cors();
