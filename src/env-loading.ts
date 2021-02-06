import { config } from 'dotenv';
import dotenvenc from 'dotenvenc';

dotenvenc(process.env.DOTENVENC_KEY);

// this will read the generated `.env` and populate process.env.* accordingly
config();
