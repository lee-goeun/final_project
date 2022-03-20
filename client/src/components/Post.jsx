import './Post.css';
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
  faImage,
  faTrashCan,
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
import { getPostList } from '../redux/modules/post';

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

const PostContainer = ({
  boardId = '',
  imgListSection,
  userImg = 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg',
  userId = '',
  boardTitle = '',
  boardContent = '',
  boardGood,
  boardViews,
  boardCreated = 'date',
  collectStatus,
  commentSection,
  postMenuSection,
  postLikeSection,
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
    userImg: '',
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
        userImg: data.userImg,
        //필요한 유저 정보 이곳에다가 추가(백엔드 authController에서도 추가해야함)
      };
    });
  };

  const currentUserId = userInfo.userId;

  const [showPostMenu, setShowPostMenu] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [commentContent, setCommentContent] = useState();

  const commentInput = useRef();

  // const navigate = useNavigate();

  const clickGoToCommnet = (e) => {
    commentInput.current.focus();
  };

  // 관심게시물 등록 버튼 클릭시
  const [isFavoritePost, setIsFavoritePost] = useState(false);
  const clickFavoritePost = () => {
    axios
      .post(`http://localhost:3001/board/post/${boardId}/collect`, {
        boardId,
        userId: currentUserId,
      })
      .then((res) =>
        console.log(
          `${userId}님께서 ${boardId}번 게시물을 관심 게시물로 등록하였습니다.`,
          setIsFavoritePost(true)
        ),
      )
      .catch((error) => console.log(error));
    setIsFavoritePost(!isFavoritePost);
  };

  // 댓글 작성 ENTER 버튼 클릭시
  const clickCommentEnter = (e) => {
    axios
      .post(`http://localhost:3001/board/comment/${boardId}`, {
        boardId,
        userId: currentUserId,
        commentContent,
      })
      .then((res) => {
        console.log(res);
        commentInput.current.value = '';
        // window.location.replace(`/board/${boardId}`);
      })
      .catch((error) => {
        console.log('댓글작성 에러 : ', error);
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      });
  };

  return (
    <>
      <div className="post-container">
        <div className="pc-left">
          <CarouselStyle>
            <div className="carousel-img-container">
              <Slider {...settings}>{imgListSection}</Slider>
            </div>
          </CarouselStyle>
        </div>
        <div className="pc-right">
          <div className="pr01">
            <img src={userImg} alt="유저이미지" />
          </div>
          <div className="pr02">
            <h2>{userId}</h2>
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
              <div className="menu-modal-container">{postMenuSection}</div>
            )}
          </div>
          <div className="pr04">
            <h3>{boardTitle}</h3>
            {boardContent}
          </div>
          {/* 보드 좋아요 */}
          <div className="pr05">
            <p>
              {postLikeSection}

              <span className="counting">{boardGood}</span>

              <FontAwesomeIcon icon={borderEye} id="viewss" />
              <span className="counting">{boardViews}</span>

              {collectStatus === 1 ? (
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
          <div className="pr06">{commentSection}</div>
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
    </>
  );
};

const MiniPostContainer = ({ postList, loadingPostList }) => {
  useEffect(() => {
    console.log('MiniPostContainer 렌더링');
    console.log('미니렌더링', postList);
  }, [postList]);

  return (
    <>
      {loadingPostList && <LoadingCont />}
      {!loadingPostList && postList && (
        <>
          {postList.map((post) => (
            <Link key={post.boardId} to={`${post.boardId}`}>
              <div className="mini-post-container">
                <div className="mpimg-container">
                  <img
                    src={
                      'http://localhost:3001/board/download?boardImgName=' +
                      post.boardImgList[0]
                    }
                    alt="이미지"
                  />
                </div>
                <div className="content-container">
                  <span>
                    {post.boardGood}
                    <FontAwesomeIcon
                      icon={borderHeart}
                      id="border-heart-icon"
                    />
                  </span>
                  <span>
                    {post.boardViews}
                    <FontAwesomeIcon icon={borderEye} id="border-views-icon" />
                  </span>
                </div>
                {post.boardImgList.length > 1 ? (
                  <div className="imgs-info">
                    <FontAwesomeIcon icon={faClone} id="multiple-img-icon" />
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </>
      )}
    </>
  );
};

// 댓글 API 종합
const CommentContainer = ({
  userNick,
  userImg = 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg',
  commentContent,
  commentLikeCounting,
  commentCreated,
  commentId,
  reportedUserId,
}) => {
  const [showmodifyCommentModal, setShowModifyCommentModal] = useState(false);

  const [CommentModal, setCommentModal] = useState('');

  useEffect(() => {
    setCommentModal(commentContent);
  }, [commentContent]);

  const clickModifyComment = (e) => {
    setShowModifyCommentModal(!showmodifyCommentModal);
  };

  // 임시 추가

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
    userImg: '',
  });

  const getAuth = async () => {
    try {
      const tokenValidationResponse = await axios({
        url: 'http://localhost:3001/auth/auth',
        method: 'get',
        headers: { 'x-access-token': localStorage.getItem('token') },
      });
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
        commentId: data.commentId,
        userNick: data.userNick,
        userName: data.userName,
        region1: data.region1,
        region2: data.region2,
        region3: data.region3,
        userImg: data.userImg,
        //필요한 유저 정보 이곳에다가 추가(백엔드 authController에서도 추가해야함)
      };
    });
  };

  const currentUserId = userInfo.userId;

  // 댓글 삭제 [완료]
  const clickDeleteComment = async (e) => {
    await axios
      .delete(`http://localhost:3001/board/comment/${commentId}`, {})
      .then((res) => {
        console.log(res);
        alert('댓글이 삭제되었습니다.');
      })
      .catch((err) => {
        console.log('댓글삭제 에러 : ', err);
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      });
  };

  // 댓글 수정 [값 전달까지는 가능 commentContent값]
  const clickModifyCommentText = async (e) => {
    await axios
      .put(`http://localhost:3001/board/comment/edit/${commentId}`, {
        userId: currentUserId,
        commentContent: CommentModal,
      })
      .then((res) => {
        console.log(res);
        alert('댓글이 수정되었습니다.');
      })
      .catch((err) => {
        console.log('댓글 수정 에러 : ', err);
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      });
  };

  // 댓글 신고 버튼
  const [showReportCommentModal, setShowReportCommentModal] = useState(false);

  const clickReportComment = (e) => {
    setShowReportCommentModal(true);
  };

  
  // 댓글 신고 [완료]
  const clickReportCommentText = async (e) => {
    await axios
      .post(`http://localhost:3001/board/comment/${reportedUserId}/report`, {
        userId: currentUserId,
        commentId,
      })
      .then((res) => {
        console.log(res);
        alert('신고가 완료되었습니다. 운영진이 검토후 처리될 예정입니다.');

      })
      .catch((err) => {
        console.log('댓글 신고 에러 : ', err);
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      });
    setShowReportCommentModal(false);
  };
  
  // const navigate = useNavigate('');
  // navigate(`/board/${commentId}`);

  // 댓글 좋아요 버튼 클릭시
  const [isLikeComment, setIsLikeComment] = useState(false);
        // setIsLikeComment (true)
  
  // const useLikeComment = ()=>{};

  // 댓글 좋아요 처리 
  // useEffect(()=>{
  //   clickLikeComment()
  // },[])

  const clickLikeComment = async (e) => {

    await axios
      .post(`http://localhost:3001/board/comment/${commentId}/like`, {
        userId: currentUserId,
      })
      .then((res) => {
        console.log(res);
        alert('좋아요를 누르셨습니다.');
        setIsLikeComment (true)
        // 좋아요 활성화
        // let newLike = isLikeComment;
        // newLike = true;
        // setIsLikeComment (newLike)
      })
      .catch((err) => {
        console.log('댓글 좋아요 에러 : ', err);
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      });
  };

  return (
    <>
    {/* 이용자 이미지 컨테이너 */}
      <div className="comment-container">
        <div className="cc01">
          <div className="cc01-img-container">
            <img src={process.env.PUBLIC_URL + `${userImg}`} />
          </div>
        </div>
        <div className="cc02">
          <h4>{userNick}</h4>
          <p></p>
        </div>
        <div className="cc03">
          <FontAwesomeIcon
            icon={faPen}
            id="edit-icon"
            title="수정하기"
            onClick={clickModifyComment}
          />
          <FontAwesomeIcon
            icon={faX}
            id="delete-icon"
            title="삭제하기"
            onClick={clickDeleteComment}
          />
          <FontAwesomeIcon
            icon={faBullhorn}
            id="report-icon"
            title="신고하기"
            onClick={clickReportComment}
          />
        </div>
        <div className="cc04">
          <p>
            {commentContent}
            <br />
            <span className="comment-date">
              {commentCreated.substr(2, 8)}　{commentCreated.substr(11, 5)}
            </span>
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
                onClick={clickLikeComment}
              />
            )}
            <span className="comment-like-count">{commentLikeCounting}개</span>
          </p>
        </div>
      </div>

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
            className="report-comment-confirm"
            onClick={clickReportCommentText}
          >
            신고
          </button>
        </div>
      ) : null}
      {/* 텍스트 값 갖고 오는 곳 */}
      {showmodifyCommentModal && (
        <div className="comment-modal--modify">
          <textarea
            onChange={(e) => setCommentModal(e.target.value)}
            value={CommentModal}
          ></textarea>
          <div>
            <button
              className="modify-comment-cancel"
              onClick={() => {
                setShowModifyCommentModal(!showmodifyCommentModal);
              }}
            >
              취소
            </button>

            <button
              className="modify-comment-yes"
              onClick={clickModifyCommentText}
            >
              수정
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const PostBackground = ({ postList, loadingPostList, getPostList,}) => {

// , boardTitle,  추가 필요 위치  boardTitle,



  useEffect(
    () => {
      getPostList();
    },
    [getPostList],
    [postList],
  );

  // [서성조 추가] 작업 필요함
  
  // const [postModal, setpostModal] = useState('');

  // useEffect(() => {
  //   setpostModal(boardTitle);
  // }, [boardTitle]);



  const [showUploadFormModal, setShowUploadFormModal] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [imgFiles, setImgFiles] = useState(null);
  const [showImages, setShowImages] = useState([]);

  const uploadDiv = useRef();

  const showText = () => {
    uploadDiv.current.style.height = '100px';
  };
  const hideText = () => {
    uploadDiv.current.style.height = '50px';
  };

  // 게시물 업로드 [정상 완료]
  const handleChangeFile = (e) => {
    setImgFiles(e.target.files);
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }
    setShowImages(imageUrlLists);
  };

  // 게시물 작성시 [정상 완료]
  const clickPostWrite = (e) => {
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append('img', imgFiles[i]);
    }
    // formData.append('img', imgFiles);
    formData.append('boardTitle', boardTitle);
    formData.append('boardContent', boardContent);
    formData.append('categoryIndex', 2);
    formData.append('token', localStorage.getItem('token'));
    axios
      .post('http://localhost:3001/board/post', formData)
      .then((res) => {
        if (res.status == 200) {
          alert('게시글이 업로드 되었습니다.');
          getPostList();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          '오류가 발생했습니다. 로그인을 하시거나 잠시후 다시 시도해주세요.',
        );
      });

    setShowUploadFormModal(!showUploadFormModal);
  };

  // 작성 취소시 [정상]
  const clickUploadFormModal = () => {
    setShowImages([]);
    // setImgFile(null);
    setShowUploadFormModal(!showUploadFormModal);
  };


  const textInput = useRef('')
  // 게시물 검색 API
  const searchPost = (e) => {
    axios.get('http://localhost:3001/board/',)
      .then((res) => {
        console.log(res);
        // alert('검색 끝 test');
      })
      .catch((error) => {
        console.log(error);
        alert(
          '오류가 발생했습니다. 잠시후 다시 시도해주세요.',
        );
      });
  };


  // 게시물 내용 수정
  const clickPostModify = (e) => {
    axios
      .put('http://localhost:3001/board/post',)
      .then((res) => {
        if (res.status == 200) {
          alert('게시글이 업로드 되었습니다.');
          getPostList();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          '오류가 발생했습니다. 로그인을 하시거나 잠시후 다시 시도해주세요.',
        );
      });
  };

  // 참조 자료
  // const clickReportCommentText = async (e) => {
  //   await axios
  //     .post(`http://localhost:3001/board/comment/${reportedUserId}/report`, {
  //       userId: currentUserId,
  //       commentId,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       alert('신고가 완료되었습니다. 운영진이 검토후 처리될 예정입니다.');
  //     })
  //     .catch((err) => {
  //       console.log('댓글 신고 에러 : ', err);
  //       alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
  //     });
  //   setShowReportCommentModal(false);
  // };




  return (
    <>
      <div className="post-background">
        <div className="post-filter">
          {/* <div className="pf-left"></div> */}
          {/* 게시물 페이지 검색 값 갖고 오는 곳 */}
          <div>
            <form className="post-search-form">
              <FontAwesomeIcon icon={faSearch} className="post-search-icon" />
              <input
                className="post-search-input"
                type="text"
                // her={textInput}
                placeholder="검색하기.."
                onChange={searchPost}
                // value={CommentModal}
              />
            </form>
          </div>
        </div>


        <div className="upload-post-div" ref={uploadDiv}>
          <div>게시물 올리기</div>
          <div onMouseOver={showText} onMouseOut={hideText}>
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="upload-post-btn"
              title="게시물 올리기"
              onClick={clickUploadFormModal}
            />
          </div>
        </div>

        <div className="post-list">
          <MiniPostContainer
            postList={postList}
            loadingPostList={loadingPostList}
          />
        </div>
      </div>

      {/* 게시물 작성폼 모달창 */}
      {showUploadFormModal ? (
        <div className="upload-modal-wrapper">
          <div className="upload-modal-container">
            <div className="post-upload-form-container">
              <label htmlFor="post-img-select" title="이미지 올리기">
                <FontAwesomeIcon icon={faImage} className="upload-image-btn" />
                이미지 올리기
              </label>
              <button
                type="button"
                className="image-delete-btn"
                title="이미지 지우기"
                onClick={() => {
                  setShowImages([]);
                }}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="image-reset-btn"
                />
                이미지 지우기
              </button>
              <input
                type="file"
                id="post-img-select"
                accept="image/*"
                multiple="multiple"
                onChange={handleChangeFile}
              />

              {showImages.map((img, i) => (
                <div key={i} className="img-preview-container">
                  <img src={img} alt="업로드할 이미지" />
                </div>
              ))}
              <input
                className="post-title-input"
                type="text"
                placeholder="제목을 입력하세요."
                onChange={(e) => {
                  setBoardTitle(e.target.value);
                }}
              />
              <textarea
                placeholder=" 내용을 입력하세요.
                &#10;
                이미지는 최대 5장까지 첨부 가능합니다. 
                &#10;
                여러장일 경우 한번에 선택해주세요."
                onChange={(e) => {
                  setBoardContent(e.target.value);
                }}
              ></textarea>
            </div>

            <button className="upload-cancel" onClick={clickUploadFormModal}>
              취소
            </button>
            <button className="upload-confirm" onClick={clickPostWrite}>
              작성
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default connect(
  ({ post }) => ({
    postList: post.postList,
    loadingPostList: post.loading.GET_POST_LIST,
  }),
  {
    getPostList,
  },
)(PostBackground);

export { PostContainer, MiniPostContainer, CommentContainer };
