import styled from 'styled-components';

const MiniPostCardStyle = styled.div`
  .mini-post-container {
    display: inline-block;
    margin: 15px 15px;
    width: 320px;
    height: 320px;
    overflow: hidden;
    background-color: rgb(30, 30, 30);
    box-shadow: 3px 3px 10px #c4c4c4;

    cursor: pointer;
  }
  .mpimg-container {
    width: 100%;
    height: 100%;
  }
  .mpimg-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content-container {
    position: relative;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: right;
    background-color: rgba(30, 30, 30, 0.3);
    backdrop-filter: blur(5px);
  }
  .content-container > span {
    margin: 0 10px;
  }
  #border-heart-icon,
  #border-comment-icon,
  #border-views-icon {
    margin-left: 5px;
  }

  #comment-icon {
    color: var(--accent-default);
  }
  .mini-post-container:hover .content-container {
    bottom: 30px;
  }
  .imgs-info {
    position: relative;
    bottom: 60px;
    text-align: left;
    width: 100%;
    height: 30px;
  }
  #multiple-img-icon {
    margin-left: 10px;
    margin-top: 7px;
    color: white;
  }
`;

const MiniPostCard = ({ postList, loadingPostList }) => {
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
            <>
              <Link to={`${post.boardId}`}>
                <MiniPostCardStyle>
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
                </MiniPostCardStyle>
              </Link>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default MiniPostCard;
