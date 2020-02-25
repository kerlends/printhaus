import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PageMeta from '../PageMeta';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      maxWidth: 500,
      margin: '0 auto',
    },
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

interface Props {
  html: string;
  title: string;
}

const DocPage = ({ html, title }: Props) => {
  const classes = useStyles();
  return;
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
        variant="subtitle1"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </CardContent>
  </Card>;
};

export default DocPage;
