/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PageMeta from '../PageMeta';

const enhance = withStyles((theme) => {
  const { unit } = theme.spacing;
  return {
    root: {
      marginLeft: unit * 2,
      marginRight: unit * 2,
      [theme.breakpoints.up('md')]: {
        maxWidth: 500,
        margin: '0 auto',
      },
    },
    header: {
      marginTop: unit * 2,
      marginBottom: unit * 4,
      [theme.breakpoints.up('md')]: {
        marginBottom: unit * 2,
      },
    },
  };
});

const DocPage = ({ classes, html, title }) => (
  <Card className={classes.root}>
    <PageMeta title={title} />
    <CardHeader
      title={title}
      titleTypographyProps={{
        align: 'center',
      }}
      className={classes.header}
    />
    <CardContent>
      <Typography
        variant="h5"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </CardContent>
  </Card>
);

export default enhance(DocPage);
