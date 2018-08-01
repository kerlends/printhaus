/* @flow */

import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

const Page = ({ classes, data }: any) => (
  <Card className={classes.root}>
    <CardHeader
      title={data.page.title}
      titleTypographyProps={{ align: 'center' }}
      className={classes.header}
    />
    <CardContent>
      <Typography
        variant="subheading"
        dangerouslySetInnerHTML={{
          __html: data.page.html,
        }}
      />
    </CardContent>
  </Card>
);

export default enhance(Page);

export const query = graphql`
  query Page($handle: String) {
    page: shopifyPage(handle: { eq: $handle }) {
      title
      html: body_html
    }
  }
`;
