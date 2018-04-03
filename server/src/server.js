require('dotenv').config();

import Express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bp from 'body-parser';

import FirestoreConnector from './connectors/FirestoreConnector';
import ShopStationConnector from './connectors/ShopStationConnector';
import schema from './schema';

const app = Express();

app.use(bp.json());

app.use(
  '/graphql',
  graphqlExpress((request) => {
    return {
      schema,
      context: {
        Firestore: new FirestoreConnector({
          baseUrl: process.env.FS_DB_URL,
          auth: request.headers.auth,
        }),
        ShopStation: new ShopStationConnector(),
      },
    };
  }),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3030, (err) => {
  if (err) console.error(err);
  console.log('Listening on 3030');
});
