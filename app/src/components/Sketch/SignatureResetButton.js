import React from 'react';
import { IconButton } from 'components';
import { css } from 'glamor';

const styles = css({
  position: 'absolute',
  top: 10,
  right: 10,
});

const SignatureResetButton = ({ onResetClick }) => (
  <IconButton className={styles} onClick={onResetClick} icon="clear" />
);

export default SignatureResetButton;
