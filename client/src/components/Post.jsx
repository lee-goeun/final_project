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
import { getPostList } from '../redux/modules/post';
import loading from '../redux/modules/loading';

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
  boardGood = 0,
  boardViews = 0,
  boardCreated = 'date',
  userInfo,
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

  console.log('로그인 정보', userInfo);

  const [isFollow, setIsFollow] = useState(false);

  const [showPostMenu, setShowPostMenu] = useState(false);

  const [isLike, setIsLike] = useState(false);

  const commentInput = useRef();

  const navigate = useNavigate();

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
          <div className="pr06">
            <CommentContainer />
          </div>
          <div className="pr07">
            <input
              type="text"
              maxLength="50"
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
        <>
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
                // boardId 값으로 변경해야함
                axios
                  .delete(`http://localhost:3001/board/post/${boardId}`)
                  .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      alert('게시물이 삭제되었습니다.');
                      navigate('/board');
                    }
                  });
                setShowDeleteModal(!showDeleteModal);
              }}
            >
              삭제
            </button>
          </div>
        </>
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

const MiniPostContainer = ({ postList, loadingPostList }) => {
  return (
    <>
      {loadingPostList && <LoadingCont />}
      {!loadingPostList && postList && (
        <>
          {postList.map((post) => (
            <>
              <Link to={'post/' + post.boardId}>
                <div key={post.boardId} className="mini-post-container">
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
                      <FontAwesomeIcon
                        icon={borderEye}
                        id="border-views-icon"
                      />
                    </span>
                  </div>
                  {/* {po.multipleImg && (
                <div className="imgs-info">
                  <FontAwesomeIcon icon={faClone} id="multiple-img-icon" />
                </div>
              )} */}
                </div>
              </Link>
            </>
          ))}
        </>
      )}
    </>
  );
};

const CommentContainer = () => {
  const [comment, setCommnet] = useState({
    comments: [
      {
        id: 44134,
        nick: '집사',
        img: 'https://blog.kakaocdn.net/dn/btkVeS/btqFOXbMQbB/Uf5rey5lRoKKRStYNn5oVK/img.png',
        date: '2022/02/10',
        content: '고양이 진짜 이쁘네요 부러워용ㅠ',
        key: 2125325,
      },
      {
        id: 3451,
        nick: '고양이나만없어',
        img: 'https://image.fnnews.com/resource/media/image/2021/04/21/202104211351203685_l.jpg',
        date: '2022/02/12',
        content: '고양이 무슨 종이에요?',
        key: 21253212125,
      },
      {
        id: 125122,
        nick: '가나다라',
        img: 'https://img.hankyung.com/photo/202103/20210323110008_60594ba899dab_1.jpg',
        date: '2022/02/20',
        content:
          '부럽다. 부럽다. 부럽다. 부럽다. 부럽다.부럽다. 부럽다. 부럽다. 부럽다. 부럽다.부럽다. 부럽다. 부럽다. 부럽다. 부럽다.부럽다. 부럽다. 부럽다. 부럽다. 부럽다.',
        key: 21253258998989,
      },
    ],
  });

  const [showmodifyCommentModal, setShowModifyCommentModal] = useState(false);

  const clickModifyComment = (e) => {
    setShowModifyCommentModal(!showmodifyCommentModal);
  };

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
            <FontAwesomeIcon
              icon={faPen}
              id="edit-icon"
              title="수정하기"
              onClick={clickModifyComment}
            />
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
      {showmodifyCommentModal && (
        <div className="comment-modal--modify">
          <textarea>기존 텍스트</textarea>
          <div>
            <button
              className="modify-comment-cancel"
              onClick={() => {
                setShowModifyCommentModal(!showmodifyCommentModal);
              }}
            >
              취소
            </button>
            <button className="modify-comment-yes">수정</button>
          </div>
        </div>
      )}
    </>
  );
};

const PostBackground = ({ postList, loadingPostList, getPostList }) => {
  useEffect(() => {
    getPostList();
  }, [getPostList]);

  const uploadDiv = useRef();
  const filterList = useRef();
  const [isShowFilter, setIsShowFilter] = useState(false);

  const showText = () => {
    uploadDiv.current.style.height = '100px';
  };
  const hideText = () => {
    uploadDiv.current.style.height = '50px';
  };
  const showFilter = (e) => {
    setIsShowFilter(!isShowFilter);
    if (isShowFilter === false) {
      filterList.current.style.width = '240px';
    } else {
      filterList.current.style.width = '0';
    }
  };

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');

  useEffect(() => {}, [imgBase64, imgFile]);
  const handleChangeFile = (e) => {
    console.log(e.target.files);
    setImgFile(e.target.files);

    // fd.append("file", e.target.files)
    setImgBase64([]);
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[i]);

      reader.onloadend = () => {
        // 파일 읽기가 완료되면 아래의 코드가 실행
        const base64 = reader.result;
        //  console.log(base64);
        if (base64) {
          // images.push(base64.toString())
          let base64Sub = base64.toString();

          setImgBase64([...imgBase64, base64Sub]);
          // setImgBase64(newObj);
          // 파일 base64 상태 업데이트
          // console.log(images)
        }
      };
    }
  };

  // 게시물 작성시
  const clickPostWrite = (e) => {
    const formData = new FormData();
    for (let i = 0; i < imgFile.length; i++) {
      formData.append('img', imgFile[i]);
    }
    // formData.append('img', imgFile);
    formData.append('boardTitle', boardTitle);
    formData.append('boardContent', boardContent);
    formData.append('categoryIndex', 2);
    formData.append('token', localStorage.getItem('token'));
    axios.post('http://localhost:3001/board/post', formData).then((res) => {
      if (res.status == 200) {
        alert('게시글이 업로드 되었습니다.');
      }
    });

    setShowUploadFormModal(!showUploadFormModal);
  };

  const [showUploadFormModal, setShowUploadFormModal] = useState(false);

  // 작성 취소시
  const clickUploadFormModal = () => {
    setImgBase64([]);
    setImgFile(null);
    setShowUploadFormModal(!showUploadFormModal);
  };

  return (
    <>
      <div className="post-background">
        <div className="post-filter">
          <div className="pf-left">
            <div className="filter-btn" onClick={showFilter}>
              <FontAwesomeIcon
                icon={faFilter}
                className="post-sort-filter-btn"
              />
              필터
            </div>
            <div className="filter-list" ref={filterList}>
              <span>최신순</span>｜<span>조회수 높은순</span>｜
              <span>좋아요 높은순</span>
            </div>
          </div>
          <div>
            <form>
              <input type="text" placeholder="검색하기.." />
              <FontAwesomeIcon icon={faSearch} className="post-search-icon" />
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
              <label htmlFor="post-img-select">이미지 업로드</label>
              <input
                type="file"
                id="post-img-select"
                multiple
                onChange={handleChangeFile}
              />

              {imgBase64.map((img) => {
                return (
                  <div className="img-preview-container">
                    <img src={img} alt="업로드할 이미지" />
                  </div>
                );
              })}
              <input
                className="post-title-input"
                type="text"
                placeholder="제목"
                onChange={(e) => {
                  setBoardTitle(e.target.value);
                }}
              />
              <textarea
                placeholder="내용"
                onChange={(e) => {
                  setBoardContent(e.target.value);
                }}
              ></textarea>
            </div>

            <button onClick={clickUploadFormModal}>취소</button>
            <button onClick={clickPostWrite}>작성</button>
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
