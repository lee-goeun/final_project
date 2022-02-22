import './Post.css';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComment,
  faEye,
  faEllipsisVertical,
  faPen,
  faXmark,
  faX,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as borderHeart,
  faComment as borderComment,
  faEye as borderEye,
} from '@fortawesome/free-regular-svg-icons';

import {
  createStoreHook,
  Provider,
  useSelector,
  useDispatch,
} from 'react-redux';
import { Link } from 'react-router-dom';
import { fontGrid } from '@mui/material/styles/cssUtils';
import { ShopTwoRounded } from '@material-ui/icons';

const PostContainer = () => {
  const [isFollow, setIsFollow] = useState(false);

  const [showPostMenu, setShowPostMenu] = useState(false);

  const [isLike, setIsLike] = useState(false);

  const commentInput = useRef();

  // 좋아요 버튼(하트) 클릭시
  const clickLike = (e) => {
    setIsLike(!isLike);
  };
  const clickGoToCommnet = (e) => {
    commentInput.current.focus();
  };

  // 삭제하기 버튼 클릭시
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const clickDeletePostBtn = (e) => {
    setShowDeleteModal(!showDeleteModal);
    setShowPostMenu(!showPostMenu);
  };

  // 댓글 작성 ENTER 버튼 클릭시
  const clickCommentEnter = (e) => {
    alert('댓글이 작성되었습니다');
  };

  return (
    <>
      <div className="pc-wrapper">
        <div className="post-container">
          <div className="pc-left">
            <img src="https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg" />
          </div>

          <div className="pc-right">
            <div className="pr01">
              <img src="http://image.cine21.com/resize/cine21/person/2018/0423/13_42_54__5add644ed52f5[W578-].jpg" />
            </div>
            <div className="pr02">
              <h2>ilovepet</h2>
              <span
                onClick={() => {
                  setIsFollow(!isFollow);
                }}
              >
                {isFollow ? '팔로잉' : '팔로우'}
              </span>
            </div>
            <div className="pr03">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                id="dots-icon"
                onClick={() => {
                  setShowPostMenu(!showPostMenu);
                }}
              />
              {/* 수정/삭제 모달창 */}
              {showPostMenu && (
                <div className="menu-modal-container">
                  <p
                    onClick={() => {
                      setShowPostMenu(!showPostMenu);
                    }}
                  >
                    수정하기
                  </p>
                  <p onClick={clickDeletePostBtn}>삭제하기</p>
                </div>
              )}
            </div>
            <div className="pr04">본문내용</div>
            <div className="pr05">
              <p>
                {isLike ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    id="heart-btn"
                    title="좋아요 취소"
                    onClick={clickLike}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={borderHeart}
                    id="border-heart-btn"
                    title="좋아요"
                    onClick={clickLike}
                  />
                )}
                <span className="counting">124</span>

                <FontAwesomeIcon icon={borderEye} id="viewss" />
                <span className="counting">203</span>

                <FontAwesomeIcon
                  icon={borderComment}
                  id="border-comment-btn"
                  title="댓글 남기기"
                  onClick={clickGoToCommnet}
                />
              </p>
              <p>2022/02/20 14:15</p>
            </div>
            <div className="pr06">
              <CommentContainer />
            </div>
            <div className="pr07">
              <input
                type="text"
                placeholder="댓글 남기기"
                ref={commentInput}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    clickCommentEnter();
                    e.target.value = '';
                  }
                }}
              />
              <button onClick={clickCommentEnter}>ENTER</button>
            </div>
          </div>
        </div>
        <span id="left-post-span">
          <FontAwesomeIcon icon={faChevronLeft} id="left-post" />
        </span>
        <span id="right-post-span">
          <FontAwesomeIcon icon={faChevronRight} id="right-post" />
        </span>
      </div>

      {showDeleteModal ? (
        <div className="delete-modal">
          <p>정말 게시물을 삭제하시겠습니까?</p>
          <button
            className="delete-cancel"
            onClick={() => {
              setShowDeleteModal(!showDeleteModal);
            }}
          >
            취소
          </button>
          <button
            className="delete-yes"
            onClick={() => {
              setShowDeleteModal(!showDeleteModal);
              alert('게시물이 삭제되었습니다.');
            }}
          >
            삭제
          </button>
        </div>
      ) : null}
    </>
  );
};

const MiniPostContainer = () => {
  const [miniPost, setMiniPost] = useState({
    post: [
      {
        id: 0,
        img: 'img/img.jpg',
        like: 22,
        comment: 2,
        views: 765,
      },
      {
        id: 1,
        img: 'img/cat.png',
        like: 2222,
        comment: 132,
        views: 3865,
      },
      {
        id: 2,
        img: 'img/sam01.jpg',
        like: 9822,
        comment: 2132,
        views: 33865,
      },
    ],
  });

  return (
    <>
      {miniPost.post.map((mPost) => (
        <Link to="/postpage/detailPost">
          <div key={mPost.id} className="mini-post-container">
            <div className="mpimg-container">
              <img
                src={process.env.PUBLIC_URL + `${mPost.img}`}
                alt="이미지 로딩 에러"
              />
            </div>
            <div className="content-container">
              <span>
                {mPost.like}
                <FontAwesomeIcon icon={borderHeart} id="border-heart-icon" />
              </span>
              <span>
                {mPost.comment}
                <FontAwesomeIcon
                  icon={borderComment}
                  id="border-comment-icon"
                />
              </span>
              <span>
                {mPost.views}
                <FontAwesomeIcon icon={borderEye} id="border-views-icon" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

const CommentContainer = () => {
  const [comment, setCommnet] = useState({
    comments: [
      {
        id: 0,
        nick: '집사',
        img: 'https://blog.kakaocdn.net/dn/btkVeS/btqFOXbMQbB/Uf5rey5lRoKKRStYNn5oVK/img.png',
        date: '2022/02/10',
        content: '고양이 진짜 이쁘네요 부러워용ㅠ',
      },
      {
        id: 1,
        nick: '고양이나만없어',
        img: 'https://image.fnnews.com/resource/media/image/2021/04/21/202104211351203685_l.jpg',
        date: '2022/02/12',
        content: '고양이 무슨 종이에요?',
      },
      {
        id: 2,
        nick: '가나다라',
        img: 'https://img.hankyung.com/photo/202103/20210323110008_60594ba899dab_1.jpg',
        date: '2022/02/20',
        content:
          '부럽다. 부럽다. 부럽다. 부럽다. 부럽다. 부럽다. 부럽다. 부럽다. 부럽다. 부럽다. 부럽다. 부럽다.',
      },
    ],
  });

  return (
    <>
      {comment.comments.map((com) => (
        <div key={com.id} className="comment-container">
          <div className="cc01">
            <div className="cc01-img-container">
              <img src={process.env.PUBLIC_URL + `${com.img}`} />
            </div>
          </div>
          <div className="cc02">
            <h4>{com.nick}</h4>
            <p>{com.date}</p>
          </div>
          <div className="cc03">
            <FontAwesomeIcon icon={faPen} id="edit-icon" title="수정하기" />
            <FontAwesomeIcon icon={faX} id="delete-icon" title="삭제하기" />
          </div>
          <div className="cc04">
            <p>{com.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

const PostBackground = () => {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <div className="post-background">
        <div className="post-filter">
          <span>최신순</span>｜<span>조회수 높은순</span>｜
          <span>좋아요 높은순</span>
        </div>

        {/* <div>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div> */}

        <div className="post-list">
          <MiniPostContainer />
        </div>
      </div>
    </>
  );
};

export default PostBackground;

export { PostContainer, MiniPostContainer, CommentContainer, PostBackground };