import * as React from 'react';
import { Location } from '@reach/router';

const withRouter = (Component) => {
  const WithRouter = (props) => (
    <Location>
      {(locationProps) => (
        <Component {...props} {...locationProps} />
      )}
    </Location>
  );

  return WithRouter;
};

export default withRouter;
