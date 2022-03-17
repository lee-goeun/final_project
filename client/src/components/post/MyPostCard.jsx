import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import {
  getMyMarketList,
  getMyMatchingList,
  getMyPostList,
} from '../../redux/modules/mypage';

const MyPostCardStyle = styled.div`
  .wrapper {
    margin: 60px auto 90px auto;
    width: 600px;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50px 600px 100px 40px;
    grid-template-areas:
      'g1 g2'
      'g3 g3'
      'g4 g4'
      'g5 g6';
    box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  }
  .g1 {
    grid-area: g1;
    padding: 0 10px;
  }
  .g2 {
    grid-area: g2;
    text-align: right;
  }
  .g3 {
    grid-area: g3;
  }
  .g4 {
    grid-area: g4;
    padding: 10px;
    min-height: 100px;
    max-height: fit-content;
  }
  .g5 {
    grid-area: g5;
    line-height: 40px;
    padding: 0 10px;
  }
  .g6 {
    grid-area: g6;
    line-height: 40px;
    text-align: right;
    padding: 0 10px;
  }
  .g1-iw {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    overflow: hidden;
    display: inline-block;
  }
  .g1-iw img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .g1 > p {
    margin-left: 10px;
    display: inline-block;
    background: none;
  }
  .post-menu {
    font-size: 35px;
    margin-top: 7px;
    cursor: pointer;
    padding: 0 15px;
  }
  .slider-wrapper {
    width: 600px;
    height: 600px;
    overflow: hidden;
    background-color: rgb(30, 30, 30);
  }
  .slider-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .heart-ic,
  .views-ic {
    margin: 0 5px 0 10px;
  }
  .heart-ic {
    color: red;
  }
`;

const CarouselStyle = styled.div`
  .slick-prev {
    left: 30px;
    z-index: 1;
    transform: translateY(-25px);
  }
  .slick-prev::before {
    right: 15px;
    bottom: 15px;
    font-size: 40px;
  }
  .slick-next {
    right: 50px;
    transform: translateY(-25px);
  }
  .slick-next::before {
    right: 25px;
    bottom: 15px;
    font-size: 40px;
  }
  .slick-prev:before,
  .slick-next:before {
    color: #e8e8e8ce;
  }
  .slick-dots {
    position: absolute;
    bottom: 20px;
    list-style: none;
    display: block;
    text-align: center;
    padding: 0;
    margin: 0;
    width: 100%;
    li {
      position: relative;
      display: inline-block;
      height: 20px;
      width: 20px;
      margin: 0 5px;
      padding: 0;
      cursor: pointer;
      button {
        border: 0;
        background: transparent;
        display: block;
        height: 20px;
        width: 20px;
        outline: none;
        line-height: 0px;
        font-size: 0px;
        color: transparent;
        padding: 5px;
        cursor: pointer;
        &:hover,
        &:focus {
          outline: none;
          &:before {
            opacity: $slick-opacity-on-hover;
          }
        }
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: $slick-dot-character;
          width: 20px;
          height: 20px;
          font-family: $slick-font-family;
          font-size: $slick-dot-size;
          line-height: 20px;
          text-align: center;
          color: $slick-dot-color;
          opacity: $slick-opacity-not-active;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      }
      &.slick-active button:before {
        color: var(--accent-default);
        opacity: $slick-opacity-default;
      }
    }
  }
`;

const MyPostCard = ({ type, userInfo }) => {
  console.log('userInfo', userInfo.userId, type);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyMarketList(userInfo.userId));
    dispatch(getMyMatchingList(userInfo.userId));
    dispatch(getMyPostList(userInfo.userId));
  }, [dispatch]);
  const myMarketList = useSelector((state) => state.mypage.marketList);
  const myMatchingList = useSelector((state) => state.mypage.matchList);
  const myPostList = useSelector((state) => state.mypage.postList);

  console.log('marektssssssssss', myMarketList, myMatchingList, myPostList);
  // 캐로셀 세팅
  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <MyPostCardStyle>
      {type == 'market' && myMarketList != undefined
        ? myMarketList.map((item) => (
            <div className="wrapper">
              <div className="g1">
                <div className="g1-iw">
                  <img
                    src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg"
                    alt="유저이미지"
                  ></img>
                </div>
                <p>{userInfo.userNick}</p>
              </div>
              <div className="g2">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="post-menu"
                />
              </div>
              <div className="g3">
                <CarouselStyle>
                  <Slider {...settings}>
                    <div className="slider-wrapper">
                      <img
                        src={`http://localhost:3001/market/download?marketId=${item.marketId}&marketImgName=${item.marketImgName}`}
                        alt="이미지"
                      />
                    </div>
                  </Slider>
                </CarouselStyle>
              </div>
              <div className="g4">
                <p>{item.marketTitle}</p>
                <p>{item.marketContent}</p>
              </div>
              <div className="g5">
                <FontAwesomeIcon icon={faEye} className="views-ic" />
                {item.marketView}
              </div>
              <div className="g6">{item.marketCreated}</div>
            </div>
          ))
        : type == 'matching' && myMatchingList != undefined
        ? myMatchingList.map((item) => (
            <div className="wrapper">
              <div className="g1">
                <div className="g1-iw">
                  <img
                    src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg"
                    alt="유저이미지"
                  ></img>
                </div>
                <p>{userInfo.userNick}</p>
              </div>
              <div className="g2">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="post-menu"
                />
              </div>
              <div className="g3">
                <CarouselStyle>
                  <Slider {...settings}>
                    <div className="slider-wrapper">
                      <img
                        src={`http://localhost:3001/match/download?matchId=${item.matchId}&matchImgName=${item.matchImgName}`}
                        alt="이미지"
                      />
                    </div>
                  </Slider>
                </CarouselStyle>
              </div>
              <div className="g4">
                <p>{item.matchTitle}</p>
                <p>{item.matchContent}</p>
              </div>
              <div className="g5"></div>
              <div className="g6">{item.matchCreated}</div>
            </div>
          ))
        : type == 'post' && myPostList != undefined
        ? myPostList.map((item) => (
            <div className="wrapper">
              <div className="g1">
                <div className="g1-iw">
                  <img
                    src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg"
                    alt="유저이미지"
                  ></img>
                </div>
                <p>{userInfo.userNick}</p>
              </div>
              <div className="g2">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="post-menu"
                />
              </div>
              <div className="g3">
                <CarouselStyle>
                  <Slider {...settings}>
                    <div className="slider-wrapper">
                      <img
                        src={`http://localhost:3001/match/download?matchId=${item.boardId}&matchImgName=${item.boardImgList}`}
                        alt="이미지"
                      />
                    </div>
                  </Slider>
                </CarouselStyle>
              </div>
              <div className="g4">
                <p>{item.boardTitle}</p>
                <p>{item.boardContent}</p>
              </div>
              <div className="g5"></div>
              <div className="g6">{item.boardCreated}</div>
            </div>
          ))
        : ''}
    </MyPostCardStyle>
  );
};

export default MyPostCard;
