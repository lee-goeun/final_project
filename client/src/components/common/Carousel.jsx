import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  margin: 0 8px;
  width: 150px;
  height: 150px;
  .iw {
    width: 150px;
    height: 150px;
    overflow: hidden;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  transition: 0.3s;
  :hover {
    transform: scale(1.03);
  }
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 1000px;
    margin: 0 auto;
    height: 250px;
  }
  .slick-slide {
    outline: none;
    width: 150px;
    height: 150px;
    margin: 20px 60px 0 60px;
  }
  .slick-track {
    top: 10%;
    max-height: 250px;
  }

  /* .slick-list {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  } */
  .slick-prev:before,
  .slick-next:before {
    display: block;
    font-size: 20px;
    color: #333;
    opacity: 1;
  }
  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: var(--accent-default);
  }
  .slick-prev {
    left: 7%;
    z-index: 999;
  }
  .slick-next {
    right: 7%;
    z-index: 999;
  }
`;

const Carousel = ({ type, userInfo }) => {
  const [timeoutList, setTimeoutList] = useState([]);
  var nowTime = new Date().getTime();
  const getTimeoutList = async () => {
    let res;
    if (type == 'matching') {
      res = await axios.get('http://localhost:3001/match/listLimit1');
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].region1 == userInfo.region1 &&
          data[i].region2 == userInfo.region2
        ) {
          setTimeoutList(data);
        }
      }
    } else {
      res = await axios.get('http://localhost:3001/market/viewCountList');
      setTimeoutList(res.data);
    }
  };
  // timeoutList.length > 5
  const settings = {
    dots: false,
    infinite: timeoutList.length > 5,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrow: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    getTimeoutList();
  }, []);

  return (
    <StyledSlider {...settings}>
      {timeoutList.map((timeout) => {
        return type == 'matching' ? (
          <StyledLink
            to={'/match/detail/' + timeout.matchId}
            key={timeout.matchId}
          >
            {timeout.id}
            <div className="iw">
              <Image
                src={
                  'http://localhost:3001/match/download?matchId=' +
                  timeout.matchId +
                  '&matchImgName=' +
                  timeout.matchImgName
                }
              />
            </div>
            <AccessAlarmIcon />
            {parseInt(
              (new Date(timeout.matchTime).getTime() - nowTime) / 1000 / 60 + 1,
            )}
            분 남음
          </StyledLink>
        ) : (
          <StyledLink
            to={'/market/detail/' + timeout.marketId}
            key={timeout.marketId}
          >
            {timeout.id}
            <Image
              src={
                'http://localhost:3001/market/download?marketId=' +
                timeout.marketId +
                '&marketImgName=' +
                timeout.marketImgName
              }
            />
          </StyledLink>
        );
      })}
      {/* 레이아웃 체크용 */}
      {/* {items.map((item) => {
        return (
          <ImageContainer>
            {item.id}
            <Image src={item.url} />
            {'남은시간'}
          </ImageContainer>
        );
      })} */}
    </StyledSlider>
  );
};

export default Carousel;
