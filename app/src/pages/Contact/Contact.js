/* @flow */

import * as React from 'react';
import { Button, Input, Typography } from 'components';

const fields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    name: 'subject',
    type: 'text',
    label: 'subject',
  },
  {
    name: 'message',
    type: 'area',
    label: 'message',
  },
];

const Contact = () => (
  <React.Fragment>
    <Typography type="title" align="center">
      contact
    </Typography>
    {fields.map((field) => <Input key={field.name} {...field} />)}
    <Button label="Send message" />
  </React.Fragment>
);

export default Contact;
