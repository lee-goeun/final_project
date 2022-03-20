import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  getMarketList,
  addLikeMarketPost,
  delLikeMarketPost,
} from '../../redux/modules/market';

const Post = ({ post, userInfo }) => {
  // 모달형식으로 링크작업 추후
  // const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   setModalVisible(true);
  // };
  // const closeModal = () => {
  //   setModalVisible(false);
  // };
  const dispatch = useDispatch();
  const [isBookmark, setIsBookmark] = useState(post.isLike);

  const bookmarkChk = () => {
    setIsBookmark(!isBookmark);
    const likeData = { marketId: post.marketId, userId: userInfo.userId };
    console.log('isBookmark', isBookmark);
    isBookmark
      ? dispatch(delLikeMarketPost(likeData), [dispatch])
      : dispatch(addLikeMarketPost(likeData), [dispatch]);
  };

  return (
    <Wrapper>
      <StyledLink to={'/market/detail/' + post.marketId}>
        <DisplayWrapper>
          <ImgInner
            src={
              'http://localhost:3001/market/download?marketId=' +
              post.marketId +
              '&marketImgName=' +
              post.marketImgName
            }
            // onClick={openModal}
          />
        </DisplayWrapper>
      </StyledLink>
      {post.isSale ? (
        <SoldOut>
          <span>판매완료</span>
        </SoldOut>
      ) : (
        ''
      )}
      <div className="mntit">
        <h3>{`${post.marketTitle}`}</h3>
      </div>
      <div className="mncoc">
        <div>
          <small>판매금액 </small>
          {`${post.price}`} 원
        </div>
        <div className="mncocicons">
          <span>
            <p className="pppppp">{post.marketViews}</p>
          </span>
          <VisibilityIcon />
          <Link to="" onClick={bookmarkChk}>
            {isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transition: 0.3s;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  width: 400px;
  height: 500px;
  margin: 30px 30px;
  position: relative;
  overflow: hidden;
  .mntit {
    padding: 5px 10px;
    height: 70px;
  }
  .mncoc {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
  }
  .mncocicons {
    padding-top: 3px;
  }
  .pppppp {
    display: inline-block;
    position: relative;
    bottom: 5px;
    right: 5px;
  }
  :hover {
    transform: translateY(-5px);
    box-shadow: 2px 2px 10px rgb(0 0 0 / 50%);
  }
`;
const SoldOut = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px auto;
  position: absolute;
  top: -20px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  span {
    border: 2px solid white;
    color: white;
    font-size: 20px;
    padding: 5px 10px;
    position: relative;
    top: 45%;
    left: 39%;
  }
`;
const StyledLink = styled(Link)`
  width: 400px;
  height: 300px;
  margin: 20px auto;
`;
const DisplayWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 400px;
  height: 400px;
  overflow: hidden;
`;

const ImgInner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MiddleSectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  max-width: 100vw;
  width: 100%;
  margin: 10px auto;
  padding: 10px 50px;
  box-shadow: 10px 10px 20px #e9e9e9, -10px -10px 20px #f0f0f0;
  border: 1px solid var(--bordercolor-default);
  border-left: none;
  border-right: none;
`;

const SearchWrapper = styled.div`
  display: flex;
  position: relative;
`;

const MiddleInnerSearch = styled.input.attrs({
  type: 'text',
  placeholder: '물품 검색하기',
})`
  cursor: pointer;
  border-radius: 30px;
  width: 100%;
  height: 35px;
  padding: 10px 30px;
  opacity: 0.5;
  background-color: white;
`;

const ItemListWrapper = styled.section`
  display: grid;
  max-width: 1300px;
  margin: 20px auto;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ItemLists = ({ loadingList, list, userInfo }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  const searchKeyword = (e) => {
    setKeyword(e.target.value);
    const data = {
      userId: userInfo.userId,
      order: 'created',
      keyword: keyword,
    };
    if (e.code === 'Enter') {
      dispatch(getMarketList(data), [dispatch]);
    }
  };

  const likeCount = () => {
    const data = { userId: userInfo.userId, order: 'like' };
    dispatch(getMarketList(data), [dispatch]);
  };

  const style1 = {
    display: 'inline-block',
    marginLeft: 50,
  };
  // const style2 = {
  //   display: 'inline-block',
  //   marginLeft: 30,
  //   color: 'red',
  // };
  return (
    <>
      <section>
        <h4 style={style1}>지금 가장 🔥 HOT한 중고물품</h4>
        <Carousel type="market" />
      </section>

      <MiddleSectionWrapper>
        <Link to="" onClick={likeCount}>
          {'관심도 높은순'}
          <FilterAltIcon sx={{ position: 'relative', top: '15%', mx: 1 }} />
        </Link>
        <SearchWrapper>
          <SearchIcon sx={{ position: 'absolute', left: '2%', top: '18%' }} />
          <MiddleInnerSearch onKeyUp={searchKeyword} />
        </SearchWrapper>
        <Link to="/market/add">
          {'중고거래 올리기'}
          <CreateIcon sx={{ position: 'relative', top: '11%', mx: 1 }} />
        </Link>
      </MiddleSectionWrapper>

      {loadingList && 'loading...'}
      {!loadingList && list && (
        <ItemListWrapper>
          {list.map((post) => (
            <Post key={post.marketId} post={post} userInfo={userInfo} />
          ))}
        </ItemListWrapper>
      )}
    </>
  );
};

export default ItemLists;
