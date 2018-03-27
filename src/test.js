//import Express from 'express'
import rp from 'request-promise';

import * as utils from './utils';
import endpoints from './endpoints';

const options = {
  method: 'post',
  headers: {
    authorization: utils.getAuth(),
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    carrierCode: 'fedex',
    serviceCode: null,
    packageCode: null,
    fromPostalCode: '78703',
    toState: 'DC',
    toCountry: 'US',
    toPostalCode: '20500',
    toCity: 'Washington',
    weight: {
      value: 3,
      units: 'ounces',
    },
    dimensions: {
      units: 'inches',
      length: 7,
      width: 5,
      height: 6,
    },
    confirmation: 'delivery',
    residential: false,
  }),
  json: true,
};

rp(endpoints.getRate, options).then(
  (res) => console.log(res),
  (err) => console.error(err),
);
