import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import Slider from 'react-slick';

const posts = [
  {
    postId: 1235125,
    imgs: [
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg',
      'https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg',
      'https://cdn.newspenguin.com/news/photo/202101/3899_12249_529.jpg',
    ],
    userImg:
      'http://image.cine21.com/resize/cine21/person/2020/0814/11_35_05__5f35f85987424[W578-].JPG',
    userNick: '마블리',
    content: '안녕하세요 펫펫 가입했어요 정보 많이 나눠요~',
    likeCount: 0,
    viewsCount: 0,
    date: '22/02/01',
  },
  {
    postId: 1255525,
    imgs: [
      'https://blog.kakaocdn.net/dn/sevmg/btqD55oHzsY/VmoRENWzrIxuKF7FKKQFK1/img.png',
      'https://img.insight.co.kr/static/2020/05/13/700/0h87189911hsqlft7617.jpg',
      'http://file2.nocutnews.co.kr/newsroom/image/2020/05/08/20200508114834525077_0_710_400.jpg',
      'https://news.imaeil.com/photos/2017/07/22/2017072200472647573_l.jpg',
      'https://img2.quasarzone.co.kr/img/data/img/editor/1810/1810___2128580865.gif',
    ],
    userImg: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg',
    userNick: '아이유',
    content: '반갑습니다',
    likeCount: 0,
    viewsCount: 0,
    date: '22/02/11',
  },
  {
    postId: 9835125,
    imgs: ['https://cdn.imweb.me/thumbnail/20170922/59c4da84ac052.jpg'],
    userImg:
      'https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20211021110626_f6de28501aed1ac97c517654f25aa432.jpg',
    userNick: '한소희',
    content: '저희집 강아지에용',
    likeCount: 0,
    viewsCount: 0,
    date: '22/02/01',
  },
];

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
            {posts.map((po) => (
              <div className="center-carousel">
                <PostContainer
                  key={po.postId}
                  userImg={po.userImg}
                  userNick={po.userNick}
                  content={po.content}
                  likeCount={po.likeCount}
                  viewsCount={po.viewsCount}
                  date={po.date}
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
