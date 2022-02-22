import React from 'react';
import Avatar from '@mui/material/Avatar';
import styled, { css } from 'styled-components';

const StyledAvatar = styled(Avatar)`
  margin: 8px;
  /* background: ${(props) => props.color || 'blue'} */
`;

const UserAvatar = (props) => (
  <StyledAvatar
    {...props}
    src="img/img.jpg"
    alt="profile pic"
    variant="circular"
  />
);

export default UserAvatar;
