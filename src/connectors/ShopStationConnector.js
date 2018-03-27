import BaseConnector from './BaseConnector';

const API_MOCK_BASE_URL =
  'https://private-anon-f17f96028a-shipstation.apiary-mock.com';
const API_KEY = '4585168171f445659888be48130f3a3a';
const API_SECRET = '114d593350464687b1411ad13352ed63';

const toB64 = (str) => Buffer.from(str).toString('base64');

const getAuth = () => `Basic ${toB64(`${API_KEY}:${API_SECRET}`)}`;

const endpoints = {
  getRate: `${API_MOCK_BASE_URL}/shipments/getrates`,
};

export default class ShopStationConnector extends BaseConnector {
  getRate = () => {
    const options = {
      headers: {
        authorization: getAuth(),
        'content-type': 'application/json',
      },
      data: {
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
      },
      url: endpoints.getRate,
      method: 'POST',
    };

    return this.request(options);
  };
}
