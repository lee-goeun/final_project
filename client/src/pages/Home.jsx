import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer } from '../components/Post';
import styled from 'styled-components';

const MainPageFooterStyle = styled.div`
  .main-body-div {
    height: 1077px;
    padding: 38px 0;
  }
  .btn-wrapper {
    display: flex;
    flex-direction: row;
  }
  .left-btn-div,
  .right-btn-div {
    position: relative;
    bottom: 630px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    width: fit-content;
    transition: 0.3s;
  }
  .left-btn-div {
    right: 10%;
  }
  .right-btn-div {
    left: 10%;
  }

  @media screen and (max-width: 2250px) {
    .left-btn-div {
      right: 16%;
    }
    .right-btn-div {
      left: 16%;
    }
  }
  @media screen and (max-width: 2000px) {
    .left-btn-div {
      width: 150px;
      height: 150px;
      bottom: 590px;
    }
    .right-btn-div {
      width: 150px;
      height: 150px;
      bottom: 590px;
    }
  }
`;

const Home = () => {
  return (
    <>
      <Header />
      <MainPageFooterStyle>
        <div className="main-body-div">
          <PostContainer />
          <div className="btn-wrapper">
            <div className="left-btn-div"></div>
            <div className="right-btn-div"></div>
          </div>
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

export default Home;
