import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import ProfileNav from './components/ProfileNav';

const Layout = styled.div``;

const ProfileHeaderBlock = styled.header``;
const Main = styled.main``;
const ProfileBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const MyPageLayout = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <Layout>
      <Header />
      <ProfileBlock>
        <ProfileHeaderBlock>
          <ProfileNav category={category} onSelect={onSelect} />
        </ProfileHeaderBlock>
        <Main>
          <Outlet />
        </Main>
      </ProfileBlock>
    </Layout>
  );
};

export default MyPageLayout;
