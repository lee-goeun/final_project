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
            <div className="left-btn-div">
              <MoveLeftBtn />
            </div>
            <div className="right-btn-div">
              <MoveRightBtn />
            </div>
          </div>
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

const MoveBtnStyle = styled.div`
  .btn-wrapper {
    position: relative;
    bottom: 600px;
    margin: 0 auto;
    width: 1800px;
    height: 500px;
    /* background-color: yellow; */
    display: flex;
    justify-content: space-between;
  }
  .left-btn,
  .right-btn {
    width: 200px;
    height: 200px;
    overflow: hidden;
    box-shadow: 3px 3px 10px #7c7c7c;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s;
  }
  .left-btn:hover,
  .right-btn:hover {
    transform: translateY(-5px);
  }
  .left-btn:hover > img,
  .right-btn:hover > img {
    filter: brightness(100%);
  }
  .left-btn > img,
  .right-btn > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(60%);
    transition: 0.3s;
  }
  @media screen and (max-width: 2000px) {
    .left-btn {
      width: 150px;
      height: 150px;
    }
    .right-btn {
      width: 150px;
      height: 150px;
    }
  }
`;

const MoveLeftBtn = () => {
  return (
    <>
      <MoveBtnStyle>
        <div className="left-btn">
          <img src={process.env.PUBLIC_URL + 'img/sam01.jpg'} />
        </div>
      </MoveBtnStyle>
    </>
  );
};

const MoveRightBtn = () => {
  return (
    <>
      <MoveBtnStyle>
        <div className="right-btn">
          <img src={process.env.PUBLIC_URL + 'img/sam02.jpg'} />
        </div>
      </MoveBtnStyle>
    </>
  );
};

export default Home;
