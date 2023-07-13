import * as dotenv from 'dotenv'

dotenv.config();

export const config = {
  dbUrl: process.env.mongo_uri,
  port: process.env.port,
  secret: process.env.secret
}

