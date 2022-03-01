import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import Slider from 'react-slick';

const MainPageFooterStyle = styled.div`
  .main-body-div {
    height: 1077px;
    padding: 38px 0;
  }
`;

const Home = () => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
  };

  return (
    <>
      <Header />
      <MainPageFooterStyle>
        <div className="main-body-div">
          <PostContainer />
          <Slider {...settings}></Slider>
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

export default Home;
