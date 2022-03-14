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
import { alertTitleClasses } from '@mui/material';
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
  getPostList,
  getPost,
  postList,
  post,
  loadingPostList,
  loadingPost,
}) => {
  useEffect(() => {
    getPostList();
    getAuth();
  }, [getPostList]);

  const [userInfo, setUserInfo] = useState();

  const getAuth = async () => {
    try {
      const tokenValidationResponse = await axios({
        url: 'http://localhost:3001/auth/auth',
        method: 'get',
        headers: { 'x-access-token': localStorage.getItem('token') },
      });
      console.log(tokenValidationResponse, 'tokenValidResponse');
      userInfoHandler(tokenValidationResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const userInfoHandler = ({ data }) => {
    setUserInfo((prevState) => {
      console.log('home', data);
      return {
        ...prevState,
        auth: data.auth,
        userId: data.userId,
        userNick: data.userNick,
        userName: data.userName,
        region1: data.region1,
        region2: data.region2,
        region3: data.region3,
        //필요한 유저 정보 이곳에다가 추가(백엔드 authController에서도 추가해야함)
      };
    });
  };

  console.log('헤더에서 auth info 가져오기', userInfo);

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
                    clickReportPost={() => {
                      setShowReportPostModal(true);
                    }}
                    clickModifyPost={() => {
                      setShowModifyPostModal(true);
                    }}
                    clickDeletePost={() => {
                      setShowDeletePostModal(true);
                    }}
                  />
                ))}
              </Slider>
            </>
          )}
        </div>
      </MainPageFooterStyle>
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
    loadingPost: post.loading.GET_POST,
    loadingPostList: post.loading.GET_POST_LIST,
  }),
  {
    getPost,
    getPostList,
  },
)(Home);
