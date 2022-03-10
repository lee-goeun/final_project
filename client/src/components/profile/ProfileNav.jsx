import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';
import UserAvatar from '../common/UserAvatar';

const categories = [
  {
    name: 'mypost',
    text: '나의 게시물',
  },
  {
    name: 'mypet',
    text: '나의 반려동물',
  },
  {
    name: 'interestingpost',
    text: '관심 게시물',
  },
  {
    name: 'profile',
    text: '프로필 관리',
  },
];

const Nav = styled.nav`
  margin: 0.5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  width: 180px;
  padding: 0 10px;
`;
const AvatarBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;
const CategoriesBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0 auto;
`;
const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  margin: 0.5rem;
  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
    `}
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const ProfileNav = ({ category, onSelect, userInfo }) => {
  const { userNick } = userInfo || '';

  return (
    <Nav>
      <AvatarBlock>
        <UserAvatar />
        <span>{userNick || ''}님</span>
      </AvatarBlock>
      <hr />
      <CategoriesBlock>
        {categories.map((c) => (
          <Category
            key={c.name}
            active={category === c.name}
            onClick={() => onSelect(c.name)}
          >
            <StyledLink to={`${c.name}`}>{c.text}</StyledLink>
          </Category>
        ))}
      </CategoriesBlock>
    </Nav>
  );
};

export default ProfileNav;
