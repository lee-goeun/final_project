import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import Slider from 'react-slick';
import axios from 'axios';

const MainPageFooterStyle = styled.div`
  .main-body-div {
    height: 1077px;
    width: 1700px;
    padding: 38px 0;
    margin: 0 auto;
  }
  .slick-slider.center.slick-initialized > .slick-prev {
    left: 40px;
    transform: translateY(-40px);
    z-index: 1;
  }
  .slick-slider.center.slick-initialized > .slick-prev::before {
    right: 15px;
    bottom: 15px;
    font-size: 80px;
  }
  .slick-slider.center.slick-initialized > .slick-next {
    right: 95px;
    transform: translateY(-40px);
  }
  .slick-slider.center.slick-initialized > .slick-next::before {
    right: 25px;
    bottom: 15px;
    font-size: 80px;
  }
  .slick-slider.center.slick-initialized > .slick-prev:before,
  .slick-slider.center.slick-initialized > .slick-next:before {
    color: var(--accent-default);
  }
`;

const Home = () => {
  useEffect(() => {
    axios
      .get('http://localhost:3001/board/')
      .then((res) => setGetMainPost(res.data));
  }, []);

  const [getMainPost, setGetMainPost] = useState([]);

  const centerModeSettings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 1,
    speed: 500,
  };

  return (
    <>
      <Header />

      <MainPageFooterStyle>
        <div className="main-body-div">
          <Slider {...centerModeSettings}>
            {getMainPost.map((po) => (
              <div className="center-carousel">
                <PostContainer
                  key={po.boardId}
                  boardId={po.boardId}
                  userId={po.userId}
                  boardImgList={po.boardImgList}
                  boardTitle={po.boardTitle}
                  boardContent={po.boardContent}
                  boardGood={po.boardGood}
                  boardViews={po.boardViews}
                  boardCreated={po.boardCreated}
                />
              </div>
            ))}
          </Slider>
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

export default Home;
