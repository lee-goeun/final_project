import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MarketLayoutWrapper = styled.div``;
const MainWrapper = styled.main``;

const MarketLayout = ({ userInfo }) => {
  
  // 조정 필요 확인용 코드
  return (
    <MarketLayoutWrapper>
      <Header />
      <MainWrapper>
        <Outlet/>
      </MainWrapper>
        <Footer/>
    </MarketLayoutWrapper>
  );
};

export default MarketLayout;