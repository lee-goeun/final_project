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
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as borderHeart,
  faComment as borderComment,
  faEye as borderEye,
} from '@fortawesome/free-regular-svg-icons';

const PostContainer = () => {
  const [isFollow, setIsFollow] = useState(false);

  const [showPostMenu, setShowPostMenu] = useState(false);

  return (
    <>
      <div className="post-wrapper">
        <div className="post-container">
          <div className="pc-left">
            <img src={process.env.PUBLIC_URL + 'img/cat.png'} />
            <div className="heart">200 ♥</div>
          </div>

          <div className="pc-right">
            <div className="pr01">
              <img src={process.env.PUBLIC_URL + 'img/cam.jpg'} />
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
                  <p>수정하기</p>
                  <p>삭제하기</p>
                </div>
              )}
              <FontAwesomeIcon icon={faX} id="modal-off-icon" title="창닫기" />
            </div>
            <div className="pr04">본문내용</div>
            <div className="pr05">
              <p>2022/02/20 14:15</p>
            </div>
            <div className="pr06">
              <CommentContainer />
              <CommentContainer />
              <CommentContainer />
              <CommentContainer />
              <CommentContainer />
            </div>
            <div className="pr07">
              <input type="text" placeholder="댓글 남기기" />
              <button>ENTER</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MiniPostContainer = () => {
  const clickPost = (e) => {
    alert('클릭');
  };
  return (
    <>
      <div className="mini-post-container" onClick={clickPost}>
        <div className="mpimg-container">
          <img src={process.env.PUBLIC_URL + 'img/img.jpg'} />
        </div>
        <div className="content-container">
          <span>
            113
            <FontAwesomeIcon icon={borderHeart} id="border-heart-icon" />
          </span>
          <span>
            2
            <FontAwesomeIcon icon={borderComment} id="border-comment-icon" />
          </span>
          <span>
            98
            <FontAwesomeIcon icon={borderEye} id="border-views-icon" />
          </span>
        </div>
      </div>
    </>
  );
};

const CommentContainer = () => {
  return (
    <>
      <div className="comment-container">
        <div className="cc01">
          <div className="cc01-img-container">
            <img src={process.env.PUBLIC_URL + 'img/cam.jpg'} />
          </div>
        </div>
        <div className="cc02">
          <h3>catman</h3>
          <p>2022/02/21</p>
        </div>
        <div className="cc03">
          <FontAwesomeIcon icon={faPen} id="edit-icon" title="수정하기" />
          <FontAwesomeIcon icon={faX} id="delete-icon" title="삭제하기" />
        </div>
        <div className="cc04">
          <p>
            와 너무 이뻐요 와 너무 이뻐요 와 너무 이뻐요 와 너무 이뻐요 와 너무
            이뻐요 와 너무 이뻐요
          </p>
        </div>
      </div>
    </>
  );
};

const PostBackground = () => {
  return (
    <>
      <div className="post-background">
        <div className="post-filter">
          <span>최신순</span>｜<span>조회수 높은순</span>｜
          <span>좋아요 높은순</span>
        </div>
        <div className="post-list">
          <MiniPostContainer />
          <MiniPostContainer />
          <MiniPostContainer />
          <MiniPostContainer />
          <MiniPostContainer />
          <MiniPostContainer />
          <MiniPostContainer />
        </div>
      </div>
    </>
  );
};

export default PostBackground;

export { PostContainer, MiniPostContainer, CommentContainer, PostBackground };
