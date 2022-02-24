import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

const MatchingPageLayoutWrapper = styled.div``;
const MainWrapper = styled.main``;

const MatchingPageLayout = () => {
  return (
    <MatchingPageLayoutWrapper>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </MatchingPageLayoutWrapper>
  );
};

export default MatchingPageLayout;
