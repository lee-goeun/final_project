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
  faBullhorn,
  faBookmark as fullBookmark,
  faMessage,
  faUser,
  faPaw,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as borderHeart,
  faComment as borderComment,
  faEye as borderEye,
  faBookmark,
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

  // 관심게시물 등록 버튼 클릭시
  const [isFavoritePost, setIsFavoritePost] = useState(false);
  const clickFavoritePost = () => {
    setIsFavoritePost(!isFavoritePost);
  };

  // 게시물 신고하기 버튼 클릭시
  const [showReportPostModal, setShowReportPostModal] = useState(false);
  const clickReportPost = () => {
    setShowReportPostModal(!showReportPostModal);
    setShowPostMenu(!showPostMenu);
  };

  // 수정하기 버튼 클릭시
  const [showEditPost, setShowEditPost] = useState(false);

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
                  <p onClick={clickReportPost}>신고하기</p>
                  <p
                    onClick={() => {
                      setShowPostMenu(!showPostMenu);
                      setShowEditPost(!showEditPost);
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

                {isFavoritePost ? (
                  <FontAwesomeIcon
                    icon={fullBookmark}
                    id="fullBookmark-btn"
                    title="관심게시물 삭제하기"
                    onClick={clickFavoritePost}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBookmark}
                    id="bookmark-btn"
                    title="관심게시물 등록하기"
                    onClick={clickFavoritePost}
                  />
                )}

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

      {showReportPostModal ? (
        <div className="report-post-modal">
          <p>정말 게시물을 신고하시겠습니까?</p>
          <button
            className="report-post-cancel"
            onClick={() => {
              setShowReportPostModal(!showReportPostModal);
            }}
          >
            취소
          </button>
          <button
            className="report-post-yes"
            onClick={() => {
              alert('운영진이 검토후 처리될 예정입니다.');
              setShowReportPostModal(!showReportPostModal);
            }}
          >
            신고
          </button>
        </div>
      ) : null}

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
      {showEditPost ? (
        <div className="edit-post-modal">
          <textarea>기존 텍스트</textarea>
          <button
            className="edit-post-cancel"
            onClick={() => {
              setShowEditPost(!showEditPost);
            }}
          >
            취소
          </button>
          <button
            className="edit-post-yes"
            onClick={() => {
              alert('게시물이 수정되었습니다.');
              setShowEditPost(!showEditPost);
            }}
          >
            수정
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


const MiniMatePostContainer = () => {

  // 산책메이트 찾기 매칭 여부
  const [isMatching,setIsMatching] = useState(false);
  
  return(
    <div className='mini-content-post-container'>
      {isMatching? 
      <div className='matching-completed'><h2>매칭완료</h2></div>
      :null}
      
        {/* <div className='mcpc01'>
          <div className='mcpc01-img-container'>
            <img src="https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20211021110626_f6de28501aed1ac97c517654f25aa432.jpg" alt='작성자이미지' />
          </div>
         <p>ilovepet</p>
        </div>
        <div className='mcpc02'>
          <p>22/02/23</p><p> 15:05</p>
        </div> */}
        <div className='mcpc03'>
          <img src='https://post-phinf.pstatic.net/MjAxNzAyMjhfOTMg/MDAxNDg4MjYxODA4ODYz.8HZ-zLSPF_nIzsSyYi8x7aSd29aLo6AJmIoaHL1GHBog.DIz1kZtGy-8Tj_hVyTTGCoHtuA58PKzB7zAYqK4slVcg.JPEG/3.jpg?type=w1200' alt='게시물이미지' />
        </div>
        <div className='mcpc04'>
          <p>산책시간　 22/02/25 19:00 ~ 20:30</p>
        </div>
        <div className='mcpc05'>
          <p>강남구 논현2동</p>
        </div>
    </div>
  )
}

const MatePostContainer = () => {

  return(
    <div className='mate-post-container'>
      <div className='mpc01'>
        <div className='mpc01-img-container'>
          <img src='http://www.newsfreezone.co.kr/news/photo/202008/254439_252946_1912.jpg' alt="작성자이미지" />
        </div>
      </div>
      <div className='mpc02'>
        <h2>산책매니아</h2><p>팔로우</p>
      </div>
      <div className='mpc03'>
        <FontAwesomeIcon icon={faEllipsisVertical} className="mate-post-menu"/>
      </div>
      <div className='mpc04'>
        
        <p>저희 코코랑 산책하실분 찾아요~~</p>
      </div>
      <div className='mpc05'>
        <div className='mpc05-img-container'>
        <img src='data:image/jpeg;base64,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' alt='게시물 이미지' />
        </div>
        <p>이따 10시에 효산공원에서 2시간정도 산책하실분 찾습니다! 저희 강아지 엄청 순해요 채팅주세요!</p>
        <p><FontAwesomeIcon icon={faClock} className="mate-appointment-time-icon" />산책 시간 정보</p>
        <p className='inf'>22/02/23 22:00 - 24:00</p>
        <p><FontAwesomeIcon icon={faUser} className="mate-writer-icon" />산책매니아 님의 정보</p>
        <p className='inf'>20대 ｜ 남자 ｜ 강남구 논현2동</p>
        <p><FontAwesomeIcon icon={faPaw} className="mate-writer-pet-icon" />산책매니아 님의 반려동물 정보</p>
        <p className='inf'>코코 ｜ 3살 ｜ 강아지 ＞ 포메라니안</p>
      </div>
      <div className='mpc06'>
         채팅으로 산책매니아 님과 약속을 잡아보세요! <FontAwesomeIcon icon={faMessage} className="mate-chatting-btn" title='채팅하기'/>
      </div>
    </div>
  )
}


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
          '부럽다. 부럽다. 부럽다. 부럽다. 부럽다.부럽다. 부럽다. 부럽다. 부럽다. 부럽다.부럽다. 부럽다. 부럽다. 부럽다. 부럽다.부럽다. 부럽다. 부럽다. 부럽다. 부럽다.',
      },
    ],
  });

  // 댓글 신고 버튼 클릭시
  const [showReportCommentModal, setShowReportCommentModal] = useState(false);
  const clickReportComment = (e) => {
    setShowReportCommentModal(true);
  };

  // 댓글 좋아요 버튼 클릭시
  const [isLikeComment, setIsLikeComment] = useState(false);

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
            <p></p>
          </div>
          <div className="cc03">
            <FontAwesomeIcon icon={faPen} id="edit-icon" title="수정하기" />
            <FontAwesomeIcon icon={faX} id="delete-icon" title="삭제하기" />
            <FontAwesomeIcon
              icon={faBullhorn}
              id="report-icon"
              title="신고하기"
              onClick={clickReportComment}
            />
          </div>
          <div className="cc04">
            <p>
              {com.content}
              <br />
              <span className="comment-date">- {com.date}</span>
              {isLikeComment ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  id="comment-like-icon"
                  onClick={() => {
                    setIsLikeComment(!isLikeComment);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={borderHeart}
                  id="comment-border-like-icon"
                  onClick={() => {
                    setIsLikeComment(!isLikeComment);
                  }}
                />
              )}
              <span className="comment-like-count">22개</span>
            </p>
          </div>
        </div>
      ))}
      {showReportCommentModal ? (
        <div className="report-comment-modal">
          <p>댓글을 신고하시겠습니까?</p>
          <button
            className="report-comment-cancel"
            onClick={() => {
              setShowReportCommentModal(false);
            }}
          >
            취소
          </button>
          <button
            className="report-comment-yes"
            onClick={() => {
              alert('운영진이 검토후 처리될 예정입니다.');
              setShowReportCommentModal(false);
            }}
          >
            신고
          </button>
        </div>
      ) : null}
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
          <MiniPostContainer/>
          <MiniMatePostContainer/>
        </div>
      </div>
    </>
  );
};

export { PostContainer, MiniPostContainer, CommentContainer, PostBackground, MiniMatePostContainer, MatePostContainer };
