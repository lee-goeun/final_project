import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMatchList } from '../../redux/modules/matching';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faMapPin } from '@fortawesome/free-solid-svg-icons';

const Post = ({ post }) => {
  // 모달형식으로 링크작업 추후
  // const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   setModalVisible(true);
  // };
  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  console.log('img', post);
  const korTime = new Date(post.matchTime);
  // const dispatch = useDispatch();

  // dispatch(getMatchPost(post.matchId), [dispatch]);

  return (
    <StyledLink to={'/match/detail/' + post.matchId}>
      <DisplayWrapper>
        {post.matchImgName != null ? (
          <ImgInner
            src={
              'http://localhost:3001/match/download?matchId=' +
              post.matchId +
              '&matchImgName=' +
              post.matchImgName
            }
          />
        ) : (
          <ImgInner src={process.env.PUBLIC_URL + '/img/LogoHorizon.png'} />
        )}
        <div>
          <h4 className="matcon">
            {`산책 예정 시간 : ${moment(korTime)
              .format('YYYY-MM-DD HH:mm')
              .substring(0, 10)} ${moment(korTime)
              .format('YYYY-MM-DD HH:mm')
              .substring(11, 13)}시${moment(korTime)
              .format('YYYY-MM-DD HH:mm')
              .substring(14, 16)}분`}
          </h4>
          <h4>{`${post.region1} ${post.region2} ${post.region3}`}</h4>
        </div>
      </DisplayWrapper>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: 400px;
  height: 500px;
  margin: 30px 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  transition: 0.3s;

  .matcon {
    width: 400px;
    height: 30px;
    padding: 2px 10px;
  }
  :hover {
    transform: translateY(-5px);
    box-shadow: 2px 2px 10px rgb(0 0 0 / 50%);
  }
`;
const DisplayWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 400px;
`;

const ImgInner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: rgb(30, 30, 30);
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
  .hd-left {
    margin-top: 7px;
  }
  .map-icn {
    color: var(--font-light);
  }
  .mappin-icn {
    position: relative;
    right: 15px;
    bottom: 7px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  position: relative;
`;

const MiddleInnerSearch = styled.input.attrs({
  type: 'text',
  placeholder: '제목, 내용, 동네 검색하기',
})`
  cursor: pointer;
  border-radius: 30px;
  width: 100%;
  height: 35px;
  padding: 10px 30px;
  opacity: 0.5;
`;

const MatchingListWrapper = styled.section`
  display: grid;
  max-width: 1300px;
  margin: 20px auto;
  grid-template-columns: 1fr 1fr 1fr;
`;
const HeaderImgStyle = styled.div`
  div {
    width: 100%;
    height: 500px;
    margin-top: 50px;
    margin-bottom: 50px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    h1 {
      display: inline-block;
      color: white;
      position: relative;
      bottom: 300px;
      left: 20%;
    }
  }
`;

const MatchingLists = ({ loadingList, list, userInfo }) => {
  console.log('user', list, userInfo);
  // dispatch(getMatchList(list[0].matchId), [dispatch]);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const searchKeyword = (e) => {
    setKeyword(e.target.value);
    if (e.code === 'Enter') {
      dispatch(getMatchList(keyword), [dispatch]);
    }
  };
  const style1 = {
    display: 'inline-block',
    marginLeft: 50,
  };
  const style2 = {
    display: 'inline-block',
    marginLeft: 30,
    color: 'red',
  };
  return (
    <>
      <HeaderImgStyle>
        <div>
          <img
            src={process.env.PUBLIC_URL + '/img/dogs_walking.jpg'}
            alt="페이지이미지"
          />
          <h1>오늘 같이 산책할 동네 친구를 찾아보세요</h1>
        </div>
      </HeaderImgStyle>
      <section>
        <h4 style={style1}>시간이 얼마 안남았어요!</h4>
        <h6 style={style2}>1시간 이내 남은 게시물 노출</h6>
        <Carousel type="matching" userInfo={userInfo} />
      </section>
      <MiddleSectionWrapper>
        <div className="hd-left">
          {/* {'검색필터'}
          <FilterAltIcon sx={{ position: 'relative', top: '15%', mx: 1 }} /> */}
          <FontAwesomeIcon icon={faMap} className="map-icn" />
          <FontAwesomeIcon icon={faMapPin} className="mappin-icn" />
          {userInfo.region1} {userInfo.region2}
        </div>
        <SearchWrapper>
          <SearchIcon sx={{ position: 'absolute', left: '2%', top: '18%' }} />
          <MiddleInnerSearch onKeyUp={searchKeyword} />
        </SearchWrapper>
        <Link to="/match/add">
          {'게시글 올리기'}
          <CreateIcon sx={{ position: 'relative', top: '11%', mx: 2 }} />
        </Link>
      </MiddleSectionWrapper>

      {loadingList && 'loading...'}
      {!loadingList && list && (
        <MatchingListWrapper>
          {list.map((post) =>
            post.region1 === userInfo.region1 &&
            post.region2 === userInfo.region2 ? (
              <Post key={post.matchId} post={post} />
            ) : (
              ''
            ),
          )}
        </MatchingListWrapper>
      )}
    </>
  );
};

export default MatchingLists;
