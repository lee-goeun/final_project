import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostContainer from '../components/Post';
import styled from 'styled-components';
import Slider from 'react-slick';
import { getPostList } from '../redux/modules/post/post';
import { connect } from 'react-redux';
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

const Home = ({ getPostList, posts, postsLoading, userInfo }) => {
  useEffect(() => {
    // actionGetPostList();
    // console.log('로딩', postsLoading);
    // console.log('포스트', posts);
    axios.get('http://localhost:3001/board/').then((res) => {
      console.log('홈에서 게시물 리스트 가져오기', res);
      setPostList(res.data);
    });
    getPostList();
  }, []);
  console.log('로그인 유저정보', userInfo);

  const [postList, setPostList] = useState([]);

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
            {/* {postsLoading ? (
              <div>로딩중</div>
            ) : (
              posts.data.map((post) => <PostContainer key={post.boardId} />)
            )} */}
            {postList.map((post) => (
              <PostContainer
                key={post.boardId}
                boardId={post.boardId}
                userId={post.userId}
                boardImgList={post.boardImgList}
                boardTitle={post.boardTitle}
                boardContent={post.boardContent}
                boardGood={post.boardGood}
                boardViews={post.boardViews}
                boardCreated={post.boardCreated}
              />
            ))}
          </Slider>
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts,
    postsLoading: state.postReducer.postsLoading,
  };
};

const mapDispatchToProps = {
  getPostList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
