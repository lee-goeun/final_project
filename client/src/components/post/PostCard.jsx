import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faEllipsisVertical,
  faPen,
  faX,
  faBullhorn,
  faBookmark as fullBookmark,
  faSearch,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as borderHeart,
  faComment as borderComment,
  faEye as borderEye,
  faBookmark,
  faSquarePlus,
  faClone,
} from '@fortawesome/free-regular-svg-icons';

import { Link, useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import axios from 'axios';
import LoadingCont from './common/LoadingCont';
import { connect } from 'react-redux';
import { getPostList, post } from '../redux/modules/post';
import loading from '../redux/modules/loading';

const PostCardStyle = styled.div`
  .post-container {
    margin: 100px auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr;
    width: fit-content;
    height: fit-content;
    box-shadow: 3px 3px 20px #c2c2c2;
  }
  .pc-left {
    background-color: rgb(30, 30, 30);
    width: 800px;
    height: 800px;
  }
  .pc-left img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .pc-right {
    width: 400px;
    height: 800px;
    background-color: rgb(250, 250, 250);

    display: grid;
    grid-template-columns: 70px 1fr 50px;
    grid-template-rows: 70px 2fr 30px 300px 40px;
    grid-template-areas:
      'pr01 pr02 pr03'
      'pr04 pr04 pr04'
      'pr05 pr05 pr05'
      'pr06 pr06 pr06'
      'pr07 pr07 pr07';
  }
  .pr01 {
    grid-area: pr01;
    padding: 10px;
  }
  .pr01 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100px;
  }
  .pr02 {
    grid-area: pr02;
    line-height: 70px;
    text-align: left;
    padding: 0 10px 0 0;
  }
  .pr02 > h2 {
    display: inline-block;
  }
  .pr02 > span {
    margin-left: 10px;
    cursor: pointer;
  }
  .pr03 {
    grid-area: pr03;
    text-align: center;
  }
  #dots-icon {
    font-size: 34px;
    padding: 0 10px;
    margin-top: 18px;
    cursor: pointer;
    color: var(--font-dark);
  }
  #modal-off-icon {
    position: relative;
    font-size: 40px;
    bottom: 590px;
    left: 630px;
    cursor: pointer;
    transition: 0.3s;
    color: var(--font-dark);
  }
  #modal-off-icon:hover {
    color: red;
  }
  .pr04 {
    grid-area: pr04;
    text-align: left;
    padding: 10px;
    border-top: 1px solid #b1b1b1;
  }
  .pr04 h3 {
    margin-bottom: 10px;
  }
  .pr05 {
    grid-area: pr05;
    line-height: 30px;
    text-align: right;
    display: flex;
    justify-content: space-between;
  }
  .pr05 > p:first-child {
    padding-left: 10px;
  }
  #border-heart-btn,
  #viewss,
  #border-comment-btn,
  #bookmark-btn {
    color: black;
    margin: 0 5px;
    cursor: pointer;
    font-size: 24px;
    transition: 0.3s;
  }
  .counting {
    margin-right: 10px;
    color: black;
  }
  #border-heart-btn:hover {
    color: red;
  }
  #border-comment-btn:hover {
    color: #45e6f2;
  }
  #heart-btn {
    color: red;
    margin: 0 5px;
    cursor: pointer;
    font-size: 24px;
  }
  #bookmark-btn:hover {
    color: var(--accent-default);
  }
  #fullBookmark-btn {
    color: #45e6f2;
    margin: 0 5px;
    cursor: pointer;
    font-size: 24px;
    transition: 0.3s;
  }
  .pr05 > p {
    display: inline-block;
    margin-right: 10px;
    color: #727272;
  }
  .pr05 > p:last-child {
    font-size: 13px;
  }
  .pr06 {
    grid-area: pr06;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: left;
    padding: 10px;
    border-top: 1px solid #b1b1b1;
  }
  .pr07 {
    grid-area: pr07;
  }
  .pr07 > input {
    width: 80%;
    height: 100%;
    padding: 0 10px;
    font-size: 13px;
    border: 1px solid white;
    transition: 0.3s;
  }
  .pr07 > input:focus {
    border: 1px solid #45e6f2;
  }
  .pr07 > button {
    width: 20%;
    height: 100%;
    background-color: #45e6f2;
    color: #ffffff;
    border: none;
  }

  /* 수정/삭제 모달창 */
  .menu-modal-container {
    position: relative;
    top: -7px;
    right: 47px;
    width: 90px;
    min-height: 60px;
    max-height: fit-content;
    padding: 5px 10px;
    font-size: 15px;
    background-color: #45e6f2;
    text-align: center;

    clip-path: polygon(
      0% 20%,
      75% 20%,
      80% 10%,
      85% 20%,
      100% 20%,
      100% 100%,
      0% 100%
    );
    border-right: 2px solid rgba(192, 192, 192, 0.5);
    border-bottom: 2px solid rgba(192, 192, 192, 0.5);
  }
  .menu-modal-container > p:first-child {
    margin-top: 20px;
  }
  .menu-modal-container > p {
    color: white;
    transition: 0.3s;
    cursor: pointer;
    margin-bottom: 2px;
  }
  .menu-modal-container > p:last-child {
    margin-bottom: 0;
  }
  .menu-modal-container > p:hover {
    color: black;
  }
  .report-post-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 300px;
    height: 150px;
    background-color: var(--bgcolor-default);
  }
  .report-post-modal > p {
    padding-top: 30px;
  }
  .report-post-cancel,
  .report-post-confirm {
    padding: 5px 20px;
    font-size: 18px;
    margin: 30px 20px 0 20px;
    border: none;
    background-color: var(--accent-default);
    box-shadow: 0 1px 5px var(--accent-dark);
  }
  .delete-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 300px;
    height: 150px;
    background-color: var(--bgcolor-default);
  }
  .delete-modal > p {
    padding-top: 30px;
  }
  .delete-cancel,
  .delete-confirm {
    padding: 5px 20px;
    font-size: 18px;
    margin: 30px 20px 0 20px;
    border: none;
    background-color: var(--accent-default);
    box-shadow: 0 1px 5px var(--accent-dark);
  }

  .edit-post-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    padding: 40px 60px;
    background-color: var(--bgcolor-default);
    text-align: center;
  }
  .edit-post-modal > textarea {
    margin: 20px auto 10px;
    padding: 10px;
    width: 400px;
    height: 400px;
    display: block;
    resize: none;
    border: 1px solid var(--bordercolor-default);
  }
  .edit-post-cancel,
  .edit-post-confirm {
    padding: 5px 20px;
    width: 150px;
    font-size: 18px;
    margin: 30px 20px 5px 20px;
    border: none;
    background-color: var(--accent-default);
    box-shadow: 0 1px 5px var(--accent-dark);
  }
`;

const CarouselStyle = styled.div`
  .carousel-img-container {
    width: 800px;
    height: 800px;
    margin: 0px auto;
    background-color: rgb(30, 30, 30);
  }
  .carousel-img-container div {
    width: 800px;
    height: 800px;
  }
  .carousel-img-container div img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .slick-prev {
    left: 30px;
    z-index: 1;
    transform: translateY(-25px);
  }
  .slick-prev::before {
    right: 15px;
    bottom: 15px;
    font-size: 40px;
  }
  .slick-next {
    right: 50px;
    transform: translateY(-25px);
  }
  .slick-next::before {
    right: 25px;
    bottom: 15px;
    font-size: 40px;
  }
  .slick-prev:before,
  .slick-next:before {
    color: #e8e8e8ce;
  }
  .slick-dots {
    position: absolute;
    bottom: 20px;
    list-style: none;
    display: block;
    text-align: center;
    padding: 0;
    margin: 0;
    width: 100%;
    li {
      position: relative;
      display: inline-block;
      height: 20px;
      width: 20px;
      margin: 0 5px;
      padding: 0;
      cursor: pointer;
      button {
        border: 0;
        background: transparent;
        display: block;
        height: 20px;
        width: 20px;
        outline: none;
        line-height: 0px;
        font-size: 0px;
        color: transparent;
        padding: 5px;
        cursor: pointer;
        &:hover,
        &:focus {
          outline: none;
          &:before {
            opacity: $slick-opacity-on-hover;
          }
        }
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: $slick-dot-character;
          width: 20px;
          height: 20px;
          font-family: $slick-font-family;
          font-size: $slick-dot-size;
          line-height: 20px;
          text-align: center;
          color: $slick-dot-color;
          opacity: $slick-opacity-not-active;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      }
      &.slick-active button:before {
        color: var(--accent-default);
        opacity: $slick-opacity-default;
      }
    }
  }
`;

const PostCard = ({
  boardId = '',
  categoryIndex = '',
  boardImgList = '',
  userImg = 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg',
  userId = '',
  boardTitle = '',
  boardContent = '',
  boardStatus = '',
  boardMod = '',
  boardDeleted = '',
  boardReport = '',
  boardSearch = '',
  boardGood,
  boardViews,
  boardCreated,
  clickReportPost,
  clickModifyPost,
  clickDeletePost,
  comment,
}) => {
  // 캐로셀 세팅
  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    getAuth();
  }, []);

  const [userInfo, setUserInfo] = useState({
    auth: false,
    userId: '',
    userNick: '',
    userEmail: '',
    userName: '',
    region1: '',
    region2: '',
    region3: '',
  });

  const getAuth = async () => {
    try {
      const tokenValidationResponse = await axios({
        url: 'http://localhost:3001/auth/auth',
        method: 'get',
        headers: { 'x-access-token': localStorage.getItem('token') },
      });
      // console.log(tokenValidationResponse, 'tokenValidResponse');
      userInfoHandler(tokenValidationResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const userInfoHandler = ({ data }) => {
    setUserInfo((prevState) => {
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

  const [isFollow, setIsFollow] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [commentContent, setCommentContent] = useState();

  const commentInput = useRef();

  const navigate = useNavigate();

  const clickGoToCommnet = (e) => {
    commentInput.current.focus();
  };

  // 관심게시물 등록 버튼 클릭시
  const [isFavoritePost, setIsFavoritePost] = useState(false);
  const clickFavoritePost = () => {
    axios
      .post(`http://localhost:3001/board/post/${boardId}/collect`, {
        boardId,
        userId,
      })
      .then((res) =>
        console.log(
          `${userId}님께서 ${boardId}번 게시물을 관심 게시물로 등록하였습니다.`,
        ),
      )
      .catch((error) => console.log(error));
    setIsFavoritePost(!isFavoritePost);
  };

  // 댓글 작성 ENTER 버튼 클릭시
  const clickCommentEnter = (e) => {
    alert('댓글이 작성되었습니다');
    axios
      .post(`http://localhost:3001/board/comment/${boardId}`, {
        boardId,
        userId,
        commentContent,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log('댓글작성 에러 : ', error));
  };

  return (
    <>
      <PostCardStyle>
        <div className="post-container">
          <div className="pc-left">
            <CarouselStyle>
              <div className="carousel-img-container">
                <Slider {...settings}>
                  <div>
                    <img
                      src={
                        'http://localhost:3001/board/download?boardImgName=' +
                        boardImgList
                      }
                      alt="이미지"
                    />
                  </div>
                </Slider>
              </div>
            </CarouselStyle>
          </div>
          <div className="pc-right">
            <div className="pr01">
              <img src={userImg} alt="유저이미지" />
            </div>
            <div className="pr02">
              <h2>{userId}</h2>
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
                  {userInfo.auth && userInfo.userId === { userId } ? (
                    <>
                      <p onClick={clickModifyPost}>수정하기</p>
                      <p onClick={clickDeletePost}>삭제하기</p>
                    </>
                  ) : (
                    <p onClick={clickReportPost}>신고하기</p>
                  )}
                </div>
              )}
            </div>
            <div className="pr04">
              <h3>{boardTitle}</h3>
              {boardContent}
            </div>
            <div className="pr05">
              <p>
                {isLike ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    id="heart-btn"
                    title="좋아요 취소"
                    onClick={() => {
                      setIsLike(!isLike);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={borderHeart}
                    id="border-heart-btn"
                    title="좋아요"
                    onClick={() => {
                      setIsLike(!isLike);
                      axios
                        .post(
                          `http://localhost:3001/board/post/${boardId}/like`,
                          { boardId, userInfo },
                        )
                        .then((res) =>
                          console.log(boardId, '번 게시물 좋아요 클릭', res),
                        )
                        .catch((error) => console.log('좋아요 에러 :', error));
                    }}
                  />
                )}

                <span className="counting">{boardGood}</span>

                <FontAwesomeIcon icon={borderEye} id="viewss" />
                <span className="counting">{boardViews}</span>

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
              <p>
                {boardCreated.substr(0, 10)}　{boardCreated.substr(11, 5)}
              </p>
            </div>
            <div className="pr06">{/* 댓글자리 */}</div>
            <div className="pr07">
              <input
                type="text"
                maxLength="50"
                placeholder="댓글 남기기"
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
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
      </PostCardStyle>
    </>
  );
};

export default PostCard;
