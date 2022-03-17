import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as borderHeart } from '@fortawesome/free-regular-svg-icons';
import {
  createSearchParams,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getPost, likePost } from '../redux/modules/post';
import { connect } from 'react-redux';
import LoadingCont from '../components/common/LoadingCont';
import { CommentContainer } from '../components/Post';
import {
  DeletePostModal,
  ModifyPostModal,
  ReportPostModal,
} from '../components/common/Modal';

const DetailStyle = styled.div`
  .post-container {
    margin: 220px auto 100px auto;
  }
  .back-to-list-btn {
    font-size: 50px;
    margin: 0 auto 80px auto;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: var(--accent-default);
    transition: 0.3s;
  }
  .back-to-list-btn:hover {
    animation: move-btn 0.5s alternate infinite;
  }
  @keyframes move-btn {
    from {
      /* transform: translateX(0); */
    }
    to {
      transform: translateX(-30px);
    }
  }
`;

const DetailPost = ({ userInfo, getPost, post, commentList, loadingPost }) => {
  console.log(post) // 게시물 정리할 때 참조 콘솔 값
  // console.log(commentList) 댓글 정리할 때 사용했음
  useEffect(() => {
    console.log(`${boardId}번 게시물 상세보기 렌더링`);
    getPost(boardId);
    axios
      .get(`http://localhost:3001/board/post/${boardId}`, {
        params: { userId: userInfo.userId },
      })
      .then((res) => {
        console.log('따로aixos 찍어본것', res);
        console.log(
          `따로axios ${boardId}번 좋아요 상태, ${res.data.goodStatus} /////////////////////`,
          `따로axios ${boardId}번 관심게시물 상태, ${res.data.collectStatus}`,
        );
        setGoodStatus(res.data.goodStatus);
      })
      .catch((e) => console.log(e));
  }, [getPost]);

  const userId = userInfo.userId;
  const navigate = useNavigate();

  const { boardId } = useParams();

  const [showReportPostModal, setShowReportPostModal] = useState();
  const [showModifyPostModal, setShowModifyPostModal] = useState();
  const [showDeletePostModal, setShowDeletePostModal] = useState();
  const [goodStatus, setGoodStatus] = useState();
  const [collectStatus, setCollectStatus] = useState();

  const clickLikePost = () => {
    console.log(userId, boardId);
    axios
      .post(`http://localhost:3001/board/post/${boardId}/like`, {
        boardId,
        userId,
      })
      .then((res) => console.log(boardId, '번 게시물 좋아요 클릭', res))
      .catch((error) => console.log('좋아요 에러 :', error));
  };

  return (
    <div>
      <DetailStyle>
        {loadingPost && <LoadingCont />}

        {!loadingPost && post && (
          <>
            <PostContainer
              key={post.boardId}
              boardId={post.boardId}
              userId={post.userNick}
              imgListSection={
                post
                  ? post.boardImgList.map((img, i) => (
                      <div key={i}>
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
              boardTitle={post.boardTitle}
              boardContent={post.boardContent}
              boardGood={post.boardGood}
              boardViews={post.boardViews}
              boardCreated={post.boardCreated}
              goodStatus={post.goodStatus}
              collectStatus={collectStatus}
              postLikeSection={
                goodStatus === 1 ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    id="heart-btn"
                    title="좋아요 취소"
                    onClick={clickLikePost}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={borderHeart}
                    id="border-heart-btn"
                    title="좋아요"
                    onClick={clickLikePost}
                  />
                )
              }
              commentSection={
                commentList || post.map(post)
                  ? commentList.map((com) => (
                      <CommentContainer
                        reportedUserId={post.reportedUserId}
                        commentModify ={post.commentModify}
                        userId={com.userId}
                        commentId={com.commentId}
                        key={com.commentId}
                        userNick={com.userNick}
                        commentContent={com.commentContent}
                        commentLikeCounting={com.commentLikeCounting}
                        commentCreated={com.commentCreated}
                        // clickDeleteComment={null}
                        // clickLikeComment={likeComment}
                      />
                    ))
                  : null
              }
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
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="back-to-list-btn"
              title="뒤로가기"
              onClick={() => {
                navigate(-1);
              }}
            />
          </>
        )}
      </DetailStyle>

      {showReportPostModal && (
        <ReportPostModal
          clickReportPostCancel={() => {
            setShowReportPostModal(!showReportPostModal);
          }}
          clickReportPostConfirm={() => {
            console.log(userInfo.userId);
            axios
              .post(`http://localhost:3001/board/post/${boardId}/report`, {
                userId: userInfo.userId,
                reportedUserId: post.userId,
              })
              .then((res) => {
                console.log(res);
                alert('운영진이 검토후 처리될 예정입니다.');
              })
              .catch((error) => console.log(error));
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
              .delete(`http://localhost:3001/board/post/${boardId}`)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  alert('게시물이 삭제되었습니다.');
                  navigate('/board');
                }
              })
              .catch((error) => console.log('게시물 삭제 에러: ', error));
            setShowDeletePostModal(false);
          }}
        />
      )}
    </div>
  );
};

export default connect(
  ({ post }) => ({
    post: post.post,
    commentList: post.commentList,
    loadingPost: post.loading.GET_POST,
  }),
  {
    getPost,
    likePost,
  },
)(DetailPost);
