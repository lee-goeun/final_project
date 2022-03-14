import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  createSearchParams,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getPost } from '../redux/modules/post';
import { connect } from 'react-redux';
import LoadingCont from '../components/common/LoadingCont';
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

const DetailPost = ({ getPost, post, loadingPost }) => {
  const navigate = useNavigate();

  const { boardId } = useParams();

  const [showReportPostModal, setShowReportPostModal] = useState();
  const [showModifyPostModal, setShowModifyPostModal] = useState();
  const [showDeletePostModal, setShowDeletePostModal] = useState();

  useEffect(() => {
    console.log(`${boardId}번 게시물 상세보기 렌더링`);
    getPost(boardId);
    // axios
    //   .get(`http://localhost:3001/board/post/${boardId}`, boardId)
    //   .then((res) => {
    //     setGetBoard(res.data);
    //     console.log('가져온 게시물', getBoard);
    //   })
    //   .catch((error) => console.log(error));
  }, [getPost]);

  return (
    <div>
      <DetailStyle>
        {loadingPost && <LoadingCont />}

        {!loadingPost && post && (
          <>
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
              .delete(`http://localhost:3001/board/post/${boardId}`)
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
    </div>
  );
};

export default connect(
  ({ post }) => ({
    post: post.post,
    loadingPost: post.loading.GET_POST,
  }),
  {
    getPost,
  },
)(DetailPost);
