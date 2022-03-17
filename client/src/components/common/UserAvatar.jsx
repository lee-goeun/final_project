import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import styled, { css } from 'styled-components';

const StyledAvatar = styled(Avatar)`
  margin: 8px;
  /* background: ${(props) => props.color || 'blue'} */
`;

const UserAvatar = (props) => {
  console.log(props.userImg, 'useravaterURL');
  return (
    <>
      <StyledAvatar
        sx={props.sx}
        src={props.user_url_img}
        alt="profile pic"
        variant="circular"
      />
    </>
  );
};

const mapStateToProps = (props) => {
  return {
    user_url_img: props.profileImgHandler.userImg,
  };
};

export default connect(mapStateToProps)(UserAvatar);
