import './Post.css';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComment,
  faEye,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as borderHeart,
  faComment as borderComment,
} from '@fortawesome/free-regular-svg-icons';

const PostContainer = () => {
  const [isFollow, setIsFollow] = useState(false);

  const [showPostMenu, setShowPostMenu] = useState(false);

  return (
    <>
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
          </div>
          <div className="pr04">본문내용</div>
          <div className="pr05">
            <p>2022/02/20 14:15</p>
          </div>
          <div className="pr06">댓글창</div>
          <div className="pr07">
            <input type="text" placeholder="댓글 남기기" />
            <button>ENTER</button>
          </div>
        </div>
      </div>
    </>
  );
};

const MiniPostContainer = () => {
  return (
    <>
      <div className="mini-post-container">
        <div className="mpimg-container">사진박스</div>
        <div className="content-container">
          <FontAwesomeIcon icon={faHeart} id="heart-icon" />
          113
          <FontAwesomeIcon icon={borderHeart} id="border-heart-icon" />
          66
          <FontAwesomeIcon icon={faComment} id="comment-icon" />
          253
          <FontAwesomeIcon icon={borderComment} id="border-comment-icon" />
          98
          <FontAwesomeIcon icon={faEye} id="views-icon" />
          20
        </div>
      </div>
    </>
  );
};

export { PostContainer, MiniPostContainer };
