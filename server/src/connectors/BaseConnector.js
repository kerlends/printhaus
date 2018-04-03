import DataLoader from 'dataloader';
import rp from 'request-promise';
import { merge } from 'ramda';

export default class BaseConnector {
  constructor({ baseUrl } = {}) {
    this.baseURL = baseUrl;
    this.rp = rp;
    this.loader = new DataLoader(this.fetch, {
      batch: false,
    });
  }

  fetch = (urls) => {
    const options = {
      json: true,
      useQuerystring: true,
      resolveWithFullResponse: true,
      timeout: 6000,
    };

    return Promise.all(
      urls.map(({ data, url, path, method = 'GET', ...rest }) => {
        if (path && path[0] === '/') path = path.slice(1);

        const urlOptions = {
          method,
          uri: url || this.baseURL + path,
          ...rest,
        };

        if (data) {
          if (method === 'POST') urlOptions.body = data;
          else urlOptions.qs = data;
        }

        const opts = merge(options, urlOptions);
        console.log(JSON.stringify(opts, null, 2));

        return new Promise((resolve, reject) => {
          this.rp(opts).then(
            ({ body }) => resolve(body),
            (error) => reject(error),
          );
        });
      }),
    );
  };

  request = async (args) => {
    try {
      return await this.loader.load(args);
    } catch (error) {
      throw error;
    }
  };
}
