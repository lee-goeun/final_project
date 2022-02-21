import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import styled, { css } from 'styled-components';

const categories = [
  {
    name: 'mypost',
    text: '나의게시물',
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
  border: 2px solid green;
`;
const AvatarBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;
const StyledAvatar = styled(Avatar)`
  margin: 8px;
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

const ProfileNav = ({ category, onSelect }) => {
  return (
    <Nav>
      <AvatarBlock>
        <StyledAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <span>잭스님</span>
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
