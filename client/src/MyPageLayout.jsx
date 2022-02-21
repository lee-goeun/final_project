import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import ProfileNav from './components/ProfileNav';

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const Header = styled.header``;
const Main = styled.main``;

const MyPageLayout = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <Layout>
      <Header>
        <ProfileNav category={category} onSelect={onSelect} />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
};

export default MyPageLayout;
