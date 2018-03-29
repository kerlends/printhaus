import * as constants from './constants'

export const toB64 = (str) =>
  Buffer.from(str).toString('base64');

export const getAuth = () => 
  `Basic ${toB64(`${constants.API_KEY}:${constants.API_SECRET}`)}`
