import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { getPostList, getPost } from '../redux/modules/post';
import LoadingCont from '../components/common/LoadingCont';

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

const Home = ({
  getPostList,
  getPost,
  postList,
  post,
  loadingPostList,
  loadingPost,
}) => {
  useEffect(() => {
    getPostList();
  }, [getPostList]);

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
      {loadingPostList && <LoadingCont />}
      <MainPageFooterStyle>
        <div className="main-body-div">
          {!loadingPostList && postList && (
            <>
              <Slider {...centerModeSettings}>
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
            </>
          )}
        </div>
      </MainPageFooterStyle>
      <Footer />
    </>
  );
};

export default connect(
  ({ post }) => ({
    post: post.post,
    postList: post.postList,
    loadingPost: post.loading.GET_POST,
    loadingPostList: post.loading.GET_POST_LIST,
  }),
  {
    getPost,
    getPostList,
  },
)(Home);
