import './PostContainer.css';
import UserImg from '../../public/img/cam.jpg';
import Dots from '../../public/img/dots.png';
import Cat from '../../public/img/cat.png';
import { useState } from 'react';

const PostContainer = () => {
  const [isFollow, setIsFollow] = useState(false);

  return (
    <>
      <div className="post-container">
        <div className="pc-left">
          <img src={Cat} alt="이미지" />
          <div className="heart">200 ♥</div>
        </div>

        <div className="pc-right">
          <div className="pr01">
            <img src={UserImg} alt="작성자프로필" />
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
            <img
              src={Dots}
              alt="아이콘"
              style={{ width: '30px', marginTop: '20px' }}
            />

            {/* 수정/삭제 모달창 */}
            <div className="menu-modal-container">
              <p>신고하기</p>
              <p>수정하기</p>
            </div>
          </div>
          <div className="pr04">본문내용</div>
          <div className="pr05">
            <p>2022/02/20 14:15</p>
          </div>
          <div className="pr06">댓글창</div>
          <div className="pr07">
            {/* 댓글 수정/삭제 진행 표기 */}
            <input type="text" placeholder="댓글 남기기" />
            <button>ENTER</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostContainer;
