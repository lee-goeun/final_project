import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

// 아이콘
import {
  faHeart,
  faEllipsisVertical,
  faPen,
  faX,
  faBullhorn,
  faBookmark as fullBookmark,
  faSearch,
  faImage,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
// 폰트?
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 작은 아이콘
import {
  faHeart as borderHeart,
  faComment as borderComment,
  faEye as borderEye,
  faBookmark,
  faSquarePlus,
  faClone,
} from '@fortawesome/free-regular-svg-icons';

import {
  ReportPostModal,
  ModifyPostModal,
  DeletePostModal,
} from '../components/common/Modal';
import axios from 'axios';

const MainPageFooterStyle = styled.div`
  .home__section01 {
    margin-top: 30px;
    width: 100%;
    height: 900px;
    background: linear-gradient(#f5f5f5, #f4f4c5);
    h2 {
      color: var(--font-dark);
    }
  }
`;

const Home = () => {
  return (
    <>
      <Header />
      <MainPageFooterStyle>
        <div className="home__section01">
          <h2>
            반려인들을 위한
            <br /> 온라인 커뮤니티
          </h2>
          <h1>PET ＆ PET</h1>
          <p>
            소셜 미디어부터 동네 이웃과 산책, 중고거래까지.
            <br /> 반려인들이 함께 만들어가는 커뮤니티입니다.
          </p>
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

export default Home;
