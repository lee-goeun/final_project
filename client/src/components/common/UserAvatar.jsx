import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import styled, { css } from 'styled-components';

const StyledAvatar = styled(Avatar)`
  margin: 8px;
  /* background: ${(props) => props.color || 'blue'} */
`;

//user사진 추후 리덕스에서 관리해야할듯

const UserAvatar = (props) => {
  const [user_img, setUser_img] = useState(
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2598&q=80',
  );

  return (
    <StyledAvatar
      {...props}
      src={user_img}
      alt="profile pic"
      variant="circular"
    />
  );
};

export default UserAvatar;
