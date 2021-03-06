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

import { Link } from 'react-router-dom';

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
  boardImgList,
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
  });

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

  // console.log('boardImgListboardImgList', boardImgList);

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
        //????????? ?????? ?????? ??????????????? ??????(????????? authController????????? ???????????????)
      };
    });
  };

  const currentUserId = userInfo.userId;

  const [showPostMenu, setShowPostMenu] = useState(false);
  // const [isLike, setIsLike] = useState(false);
  const [commentContent, setCommentContent] = useState();

  const commentInput = useRef();

  // const navigate = useNavigate();

  const clickGoToCommnet = (e) => {
    commentInput.current.focus();
  };

  // ??????????????? ?????? ?????? ?????????
  const [isFavoritePost, setIsFavoritePost] = useState(false);
  const clickFavoritePost = () => {
    axios
      .post(`http://localhost:3001/board/post/${boardId}/collect`, {
        boardId,
        userId: currentUserId,
      })
      .then((res) =>
        console.log(
          `${userId}????????? ${boardId}??? ???????????? ?????? ???????????? ?????????????????????.`,
          setIsFavoritePost(true),
        ),
      )
      .catch((error) => console.log(error));
    setIsFavoritePost(!isFavoritePost);
  };

  // ?????? ?????? ENTER ?????? ?????????
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
        console.log('???????????? ?????? : ', error);
        alert('????????? ??????????????????. ????????? ?????? ??????????????????.');
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
            <img src={userImg} alt="???????????????" />
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
            {/* ??????/?????? ????????? */}
            {showPostMenu && (
              <div className="menu-modal-container">{postMenuSection}</div>
            )}
          </div>
          <div className="pr04">
            <h3>{boardTitle}</h3>
            {boardContent}
          </div>
          {/* ?????? ????????? */}
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
                  title="??????????????? ????????????"
                  onClick={clickFavoritePost}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBookmark}
                  id="bookmark-btn"
                  title="??????????????? ????????????"
                  onClick={clickFavoritePost}
                />
              )}

              <FontAwesomeIcon
                icon={borderComment}
                id="border-comment-btn"
                title="?????? ?????????"
                onClick={clickGoToCommnet}
              />
            </p>
            <p>
              {boardCreated.substr(0, 10)}???{boardCreated.substr(11, 5)}
            </p>
          </div>
          <div className="pr06">{commentSection}</div>
          <div className="pr07">
            <input
              type="text"
              maxLength="50"
              placeholder="?????? ?????????"
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
    console.log('MiniPostContainer ?????????');
    console.log('???????????????', postList);
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
                    alt="?????????"
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

// ?????? API ??????
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

  // ?????? ??????

  useEffect(() => {
    getAuth();
  });

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
        //????????? ?????? ?????? ??????????????? ??????(????????? authController????????? ???????????????)
      };
    });
  };
  const currentUserId = userInfo.userId;

  // ?????? ?????? [??????]
  const clickDeleteComment = async (e) => {
    await axios
      .delete(`http://localhost:3001/board/comment/${commentId}`, {})
      .then((res) => {
        console.log(res);
        alert('????????? ?????????????????????.');
      })
      .catch((err) => {
        console.log('???????????? ?????? : ', err);
        alert('????????? ??????????????????. ????????? ?????? ??????????????????.');
      });
  };

  // ?????? ?????? [??? ??????????????? ?????? commentContent???]
  const clickModifyCommentText = async (e) => {
    await axios
      .put(`http://localhost:3001/board/comment/edit/${commentId}`, {
        userId: currentUserId,
        commentContent: CommentModal,
      })
      .then((res) => {
        console.log(res);
        alert('????????? ?????????????????????.');
      })
      .catch((err) => {
        console.log('?????? ?????? ?????? : ', err);
        alert('????????? ??????????????????. ????????? ?????? ??????????????????.');
      });
  };

  // ?????? ?????? ??????
  const [showReportCommentModal, setShowReportCommentModal] = useState(false);

  const clickReportComment = (e) => {
    setShowReportCommentModal(true);
  };

  // ?????? ?????? [??????]
  const clickReportCommentText = async (e) => {
    await axios
      .post(`http://localhost:3001/board/comment/${reportedUserId}/report`, {
        userId: currentUserId,
        commentId,
      })
      .then((res) => {
        console.log(res);
        alert('????????? ?????????????????????. ???????????? ????????? ????????? ???????????????.');
      })
      .catch((err) => {
        console.log('?????? ?????? ?????? : ', err);
        alert('????????? ??????????????????. ????????? ?????? ??????????????????.');
      });
    setShowReportCommentModal(false);
  };

  // const navigate = useNavigate('');
  // navigate(`/board/${commentId}`);

  // ?????? ????????? ?????? ?????????
  const [isLikeComment, setIsLikeComment] = useState(false);
  // setIsLikeComment (true)

  // const useLikeComment = ()=>{};

  // ?????? ????????? ??????
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
        alert('???????????? ??????????????????.');
        setIsLikeComment(true);
        // ????????? ?????????
        // let newLike = isLikeComment;
        // newLike = true;
        // setIsLikeComment (newLike)
      })
      .catch((err) => {
        console.log('?????? ????????? ?????? : ', err);
        alert('????????? ??????????????????. ????????? ?????? ??????????????????.');
      });
  };

  return (
    <>
      {/* ????????? ????????? ???????????? */}
      <div className="comment-container">
        <div className="cc01">
          <div className="cc01-img-container">
            <img src={process.env.PUBLIC_URL + `${userImg}`} alt="" />
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
            title="????????????"
            onClick={clickModifyComment}
          />
          <FontAwesomeIcon
            icon={faX}
            id="delete-icon"
            title="????????????"
            onClick={clickDeleteComment}
          />
          <FontAwesomeIcon
            icon={faBullhorn}
            id="report-icon"
            title="????????????"
            onClick={clickReportComment}
          />
        </div>
        <div className="cc04">
          <p>
            {commentContent}
            <br />
            <span className="comment-date">
              {commentCreated.substr(2, 8)}???{commentCreated.substr(11, 5)}
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
            <span className="comment-like-count">{commentLikeCounting}???</span>
          </p>
        </div>
      </div>

      {showReportCommentModal ? (
        <div className="report-comment-modal">
          <p>????????? ?????????????????????????</p>
          <button
            className="report-comment-cancel"
            onClick={() => {
              setShowReportCommentModal(false);
            }}
          >
            ??????
          </button>
          <button
            className="report-comment-confirm"
            onClick={clickReportCommentText}
          >
            ??????
          </button>
        </div>
      ) : null}
      {/* ????????? ??? ?????? ?????? ??? */}
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
              ??????
            </button>

            <button
              className="modify-comment-yes"
              onClick={clickModifyCommentText}
            >
              ??????
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const PostBackground = ({ postList, loadingPostList, getPostList }) => {
  // , boardTitle,  ?????? ?????? ??????  boardTitle,

  useEffect(
    () => {
      getPostList();
    },
    [getPostList],
    [postList],
  );

  // [????????? ??????] ?????? ?????????

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

  // ????????? ????????? [?????? ??????]
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

  // ????????? ????????? [?????? ??????]
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
        if (res.status === 200) {
          alert('???????????? ????????? ???????????????.');
          getPostList();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          '????????? ??????????????????. ???????????? ???????????? ????????? ?????? ??????????????????.',
        );
      });

    setShowUploadFormModal(!showUploadFormModal);
  };

  // ?????? ????????? [??????]
  const clickUploadFormModal = () => {
    setShowImages([]);
    // setImgFile(null);
    setShowUploadFormModal(!showUploadFormModal);
  };

  // const textInput = useRef('');

  // ????????? ?????? API??? ??????
  const searchPost = (e) => {
    axios
      .get('http://localhost:3001/board/')
      .then((res) => {
        console.log(res);
        // alert('?????? ??? test');
      })
      .catch((error) => {
        console.log(error);
        alert('????????? ??????????????????. ????????? ?????? ??????????????????.');
      });
  };

  // ????????? ?????? ??????
  // const clickPostModify = (e) => {
  //   axios
  //     .put('http://localhost:3001/board/post')
  //     .then((res) => {
  //       if (res.status == 200) {
  //         alert('???????????? ????????? ???????????????.');
  //         getPostList();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(
  //         '????????? ??????????????????. ???????????? ???????????? ????????? ?????? ??????????????????.',
  //       );
  //     });
  // };

  // ?????? ??????
  //   await axios
  //     .post(`http://localhost:3001/board/comment/${reportedUserId}/report`, {
  //       userId: currentUserId,
  //       commentId,
  //     })

  return (
    <>
      <div className="post-filter">
        {/* <div className="pf-left"></div> */}
        {/* ????????? ????????? ?????? ??? ?????? ?????? ??? */}
        <div>
          {/* <form className="post-search-form">
            <FontAwesomeIcon icon={faSearch} className="post-search-icon" />
            <input
              className="post-search-input"
              type="text"
              her={textInput}
              placeholder="????????????.."
              onChange={searchPost}
              value={CommentModal}
            />
          </form> */}
        </div>
      </div>
      <div className="post-background">
        <div className="upload-post-div" ref={uploadDiv}>
          <div>????????? ?????????</div>
          <div onMouseOver={showText} onMouseOut={hideText}>
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="upload-post-btn"
              title="????????? ?????????"
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

      {/* ????????? ????????? ????????? */}
      {showUploadFormModal ? (
        <div className="upload-modal-wrapper">
          <div className="upload-modal-container">
            <div className="post-upload-form-container">
              <label htmlFor="post-img-select" title="????????? ?????????">
                <FontAwesomeIcon icon={faImage} className="upload-image-btn" />
                ????????? ?????????
              </label>
              <button
                type="button"
                className="image-delete-btn"
                title="????????? ?????????"
                onClick={() => {
                  setShowImages([]);
                }}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="image-reset-btn"
                />
                ????????? ?????????
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
                  <img src={img} alt="???????????? ?????????" />
                </div>
              ))}
              <input
                className="post-title-input"
                type="text"
                placeholder="????????? ???????????????."
                onChange={(e) => {
                  setBoardTitle(e.target.value);
                }}
              />
              <textarea
                placeholder=" ????????? ???????????????.
                &#10;
                ???????????? ?????? 5????????? ?????? ???????????????. 
                &#10;
                ???????????? ?????? ????????? ??????????????????."
                onChange={(e) => {
                  setBoardContent(e.target.value);
                }}
              ></textarea>
            </div>

            <button className="upload-cancel" onClick={clickUploadFormModal}>
              ??????
            </button>
            <button className="upload-confirm" onClick={clickPostWrite}>
              ??????
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
