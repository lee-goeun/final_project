import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const MainPageFooterStyle = styled.div`
  .home__section01 {
    margin-top: 30px;
    width: 100%;
    height: 1000px;
    background: linear-gradient(#f5f5f5, #dffffd);
    .home__section01__inner {
      padding-top: 250px;
      margin: 0 auto;
      max-width: 1300px;
      height: fit-content;
      display: flex;
      justify-content: space-around;
    }
    .left-fm {
      /* position: relative;
      top: 300px; */
      overflow: visible;
      z-index: 1;
    }
    .fm1 {
      color: var(--font-dark);
    }
    .fm2 {
      font-size: 20px;
    }
    .img_logo {
      width: 250px;
      margin: 30px 0 50px 0;
    }
    .img_sam01 {
      /* position: relative;
      left: 710px;
      top: -60px; */
      width: 600px;
    }
    .to-login-btn {
      display: inline-block;
      color: var(--font-light);
      cursor: pointer;
      transition: 0.3s;
      :hover {
        transform: translateX(5px);
        color: black;
      }
    }
  }
  .home__section02 {
    width: 100%;
    height: 1000px;
    background-color: white;
    .home__section02__inner {
      padding-top: 130px;
      max-width: 1300px;
      height: fit-content;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
    }
    .hs05 {
      display: block;
      transform: translateX(-100px);
      width: 400px;
      transition: 0.3s;
      z-index: 2;
      :hover {
        transform: translate(-100px, -10px);
      }
    }
    .dogcat {
      transform: translateX(300px);
      width: 100px;
    }
    .hs02__p {
      text-align: right;
      font-size: 24px;
    }
    .to-board-btn {
      color: var(--font-light);
      text-align: right;
      transition: 0.3s;
      :hover {
        transform: translateX(-5px);
        color: black;
      }
    }
    .inner02__right {
      padding-top: 200px;
    }
  }
  .home__section03 {
    width: 100%;
    height: 1000px;
    background-color: white;
    background-image: url(${process.env.PUBLIC_URL + '/img/home_sam06.jpg'});
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;

    .home__section03_inner {
      padding: 350px 100px;
      max-width: 1300px;

      margin: 0 auto;
    }
    .hs06 {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .hs03__h1 {
      color: white;
    }
    .to-matching-btn {
      color: #e1e1e1;
      cursor: pointer;
      transition: 0.3s;
      :hover {
        transform: translateX(5px);
        color: white;
      }
    }
  }
`;

const Home = () => {
  return (
    <>
      <Header />
      <MainPageFooterStyle>
        {/* 섹션 01 */}
        <div className="home__section01">
          <div className="home__section01__inner">
            <div className="left-fm">
              <p className="fm1">반려인들을 위한 온라인 커뮤니티</p>
              <img
                className="img_logo"
                src={process.env.PUBLIC_URL + '/img/LogoHorizon.png'}
                alt="logo"
              />
              <p className="fm2">
                소셜 미디어부터 동네 이웃과 산책, 중고거래까지.
                <br /> 반려인들이 함께 만들어가는 커뮤니티입니다.
              </p>
              <br />
              <br />
              <Link to="/login">
                <p className="to-login-btn">로그인하고 바로 시작하기 ＞</p>
              </Link>
            </div>
            <div>
              <img
                className="img_sam01"
                src={process.env.PUBLIC_URL + '/img/home_sam04.png'}
                alt="홈이미지"
              />
            </div>
          </div>
        </div>

        {/* 섹션 02 */}
        <div className="home__section02">
          <div className="home__section02__inner">
            <div>
              <img
                className="hs05"
                src={process.env.PUBLIC_URL + '/img/home_sam05.png'}
                alt="홈이미지"
              />
            </div>
            <div className="inner02__right">
              <img
                className="dogcat"
                src={process.env.PUBLIC_URL + '/img/dogcat.png'}
                alt="홈이미지"
              />
              <p className="hs02__p">
                PET ＆ PET의 소셜 미디어를 통해
                <br />
                반려인들만의 특화된 소통을 나눠보세요!
              </p>
              <br />
              <br />
              <Link to="/board">
                <p className="to-board-btn">＜ 반려인들과 소통하러 가기</p>
              </Link>
            </div>
          </div>
        </div>

        {/* 섹션 03 */}
        <div className="home__section03">
          {/* <img
            className="hs06"
            src={process.env.PUBLIC_URL + '/img/home_sam06.jpg'}
            alt="홈이미지"
          /> */}
          <div className="home__section03_inner">
            <h1 className="hs03__h1">
              산책메이트 찾기를 통해
              <br />
              동네 주민과 함께 즐거운 산책을 즐겨보세요!
            </h1>
            <br />
            <br />
            <Link to="match/list">
              <p className="to-matching-btn">산책메이트 찾으러 가기 ＞</p>
            </Link>
          </div>
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

export default Home;
