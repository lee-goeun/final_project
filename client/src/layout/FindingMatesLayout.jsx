import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer'

const MatchingPageLayoutWrapper = styled.div``;
const MainWrapper = styled.main``;

const MatchingPageLayout = () => {
  return (
    <MatchingPageLayoutWrapper>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <Footer/>
    </MatchingPageLayoutWrapper>
  );
};

export default MatchingPageLayout;
