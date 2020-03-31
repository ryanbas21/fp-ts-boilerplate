import * as mongoose from 'mongoose';

export const configureDatabase = () => {
  const {
    MONGO_HOST, MONGO_PORT, MONGO_PASSWORD, MONGO_USER, MONGO_DATABASE,
  } = process.env;
  const MONGO_AUTH = (MONGO_USER && MONGO_PASSWORD) ? `${MONGO_PASSWORD}:${MONGO_USER}@` : '';
  mongoose.connect(`mongodb://${MONGO_AUTH}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`);
};
