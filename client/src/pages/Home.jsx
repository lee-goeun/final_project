import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { getPostList, getPost, likePost, post } from '../redux/modules/post';
import LoadingCont from '../components/common/LoadingCont';


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

// 메인 페이지 갖고오는 것들 타입 정리하기
const Home = ({
  userInfo, // 빈 옵젝
  getPostList, // return dispatch(actionCreator.apply(void 0, arguments)); 들어있음
  getPost, // null 값
  postList, // 값 못잡는 object 다수
  imgList, // null 값
  post, // null 값
  loadingPostList,
  loadingPost,
  postLikeSection,

  userImg = 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg',
}) => {
  
  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  // 이 영역에서 작업할 것

  // 이거에서 값을 갖고와서 처리했음. [이부분 수정해야 하네]
  //   useEffect(() => {
  //     console.log(`${boardId}번 게시물 상세보기 렌더링`);
  //     getPost(boardId);
  //     axios
  //       .get(`http://localhost:3001/board/post/${boardId}`, {
  //         params: { userId: userInfo.userId },
  //       })
  //       .then((res) => {
  //         console.log('따로aixos 찍어본것', res);
  //         console.log(
  //           `따로axios ${boardId}번 좋아요 상태, ${res.data.goodStatus} /////////////////////`,
  //           `따로axios ${boardId}번 관심게시물 상태, ${res.data.collectStatus}`,
  //         );
  //         setGoodStatus(res.data.goodStatus);
  //         setCollectStatus(res.data.collectStatus);
  //       })
  //       .catch((e) => console.log(e));
  // }, [getPost]);
  useEffect(() => {
    // console.log('여기 테스트 위치 ' + userInfo())
    // getPost = ()=>{

    // }
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

  // console.log('정상 test code 입니다.') // 정상 작동중

  // 시작 
  return (
    // <> 감싼 영역에서 출력 아래에서부터 괄호 처리
    <>
    {/* 헤더 */}
    <Header />
      {loadingPostList && <LoadingCont />}
      <MainPageFooterStyle>
        <div className="main-body-div">
          
          {!loadingPostList && postList  && (
            <>
            {/* 좋아요 버튼 && post */}
            <FontAwesomeIcon
                icon={borderHeart}
                id="border-heart-icon"
                />

                {/* {...centerModeSettings} 슬라이더 바 아래에 Slider에 넣어줘야 함 */}
              <Slider >
                {postList.map((post) => (
                  <PostContainer
                    key={post.boardId}
                    boardImgList={post.boardImgList}
                    boardId={post.boardId} // 없는 값으로 잡힘
                    userId={post.userNick}
                    // 이 값들 안잡히는 빈값
                    imgListSection={
                      post.imgList
                        ? imgList.map((img, i) => (
                            <div key={i}>
                              <div>sadasdtest</div>
                              {/* 보드 이미지 */}
                              <img src={ process.env.PUBLIC_URL + `board/${img}`}/>
                            </div>
                          ))
                        : null
                    }
                    // 값들 좋아요 버튼 갖고오기
                    
                    boardTitle={post.boardTitle}
                    boardContent={post.boardContent}
                    boardGood={post.boardGood}
                    boardViews={post.boardViews}
                    boardCreated={post.boardCreated}
                    // 아이디 값 넘겨주는 곳
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
                          <p
                          onClick={() => {
                            setShowReportPostModal(true);
                          }}
                        >
                           신고하기
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
    commentList: post.commentList,
    imgList: post.imgList,
    loadingPost: post.loading.GET_POST,
    loadingPostList: post.loading.GET_POST_LIST,
  }),
  {
    getPost,
    getPostList,
    likePost,
  },
)(Home);