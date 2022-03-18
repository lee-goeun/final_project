import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { getPostList, getPost } from '../redux/modules/post';
import LoadingCont from '../components/common/LoadingCont';

import {
  ReportPostModal,
  ModifyPostModal,
  DeletePostModal,
} from '../components/common/Modal';
import axios from 'axios';

const MainPageFooterStyle = styled.div`
  .main-body-div {
    height: 1077px;
    width: 1700px;
    padding: 38px 0;
    margin: 0 auto;
    z-index: -1;
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
  userInfo,
  getPostList,
  getPost,
  postList,
  imgList,
  post,
  loadingPostList,
  loadingPost,
}) => {
  useEffect(() => {
    getPostList();
  }, [getPostList]);

  // 현재 로그인한 유저의 아이디
  const userId = userInfo.userId;

  const [showReportPostModal, setShowReportPostModal] = useState();
  const [showModifyPostModal, setShowModifyPostModal] = useState();
  const [showDeletePostModal, setShowDeletePostModal] = useState();

  const centerModeSettings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 1,
    speed: 500,
  };

  console.log('홈에서 로그인회원 정보', userInfo.userId);

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
                    userId={post.userNick}
                    imgListSection={
                      post.imgList
                        ? imgList.map((img, i) => (
                            <div key={i}>
                              {/* 보드 이미지 */}
                              <img
                                src={
                                  'http://localhost:3001/board/download?boardImgName=' +
                                  img
                                }
                                alt="이미지"
                              />
                            </div>
                          ))
                        : null
                    }
                    // 값들
                    boardTitle={post.boardTitle}
                    boardContent={post.boardContent}
                    boardGood={post.boardGood}
                    boardViews={post.boardViews}
                    boardCreated={post.boardCreated}
                    postMenuSection={
                      userId === post.userId ? (
                        <>
                          <p
                            onClick={() => {
                              setShowModifyPostModal(true);
                            }}
                          >
                            수정하기
                          </p>
                          <p
                            onClick={() => {
                              setShowDeletePostModal(true);
                            }}
                          >
                            삭제하기
                          </p>
                        </>
                      ) : (
                        <p
                          onClick={() => {
                            setShowReportPostModal(true);
                          }}
                        >
                          신고하기
                        </p>
                      )
                    }
                  />
                ))}
              </Slider>
            </>
          )}
        </div>
      </MainPageFooterStyle>
      {/* 신고 */}
      {showReportPostModal && (
        <ReportPostModal
          clickReportPostCancel={() => {
            setShowReportPostModal(!showReportPostModal);
          }}
          clickReportPostConfirm={() => {
            alert('운영진이 검토후 처리될 예정입니다.');
            setShowReportPostModal(!showReportPostModal);
          }}
        />
      )}
      {/* 수정 */}
      {showModifyPostModal && (
        <ModifyPostModal
          clickModifyPostCancel={() => {
            setShowModifyPostModal(!showModifyPostModal);
          }}
          clickModifyPostConfirm={() => {
            setShowModifyPostModal(!showModifyPostModal);
            alert('게시물이 수정되었습니다.');
          }}
        />
      )}
      {/* 삭제 */}
      {showDeletePostModal && (
        <DeletePostModal
          clickDeletePostCancel={() => {
            setShowDeletePostModal(false);
          }}
          clickDeletePostConfirm={() => {
            axios
              .delete(`http://localhost:3001/board/post/${post.boardId}`)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  alert('게시물이 삭제되었습니다.');
                }
              })
              .catch((error) => console.log('게시물 삭제 에러: ', error));
            setShowDeletePostModal(false);
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default connect(
  ({ post }) => ({
    post: post.post,
    postList: post.postList,
    imgList: post.imgList,
    loadingPost: post.loading.GET_POST,
    loadingPostList: post.loading.GET_POST_LIST,
  }),
  {
    getPost,
    getPostList,
  },
)(Home);
