import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ProfileNav from '../components/profile/ProfileNav';

const MarketLayoutWrapper = styled.div``;
const MainWrapper = styled.main``;

const MarketLayout = ({ userInfo }) => {
  return (
    <MarketLayoutWrapper>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </MarketLayoutWrapper>
  );
};

export default MarketLayout;
