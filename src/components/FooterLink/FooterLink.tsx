import * as React from 'react';
import Link from 'gatsby-link';
import Typography, {
  TypographyProps,
} from '@material-ui/core/Typography';

interface Props extends TypographyProps {
  to: string;
}

class FooterLink extends React.Component {
  props: Props;

  renderLink = (props: any) => {
    const { to } = this.props;

    return <Link to={to} {...props} />;
  };

  render() {
    const { to, ...props } = this.props;
    return (
      <Typography
        {...props}
        color="inherit"
        component={this.renderLink}
        variant="caption"
      />
    );
  }
}

export default FooterLink;
