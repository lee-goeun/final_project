import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMatchList } from '../../redux/modules/matching'

const Post = ({ post }) => {
  // 모달형식으로 링크작업 추후
  // const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   setModalVisible(true);
  // };
  // const closeModal = () => {
  //   setModalVisible(false);
  // };
  console.log('img', post.matchImgName);
  const korTime = new Date(post.matchTime);
  return (
    <StyledLink to={'/match/detail/' + post.matchId}>
      <DisplayWrapper>
        {post.matchImgName != null ? <ImgInner
          src={
            'http://localhost:3001/match/download?matchId=' +
            post.matchId +
            '&matchImgName=' +
            post.matchImgName
          }
        /> : <ImgInner src={process.env.PUBLIC_URL + '/img/LogoHorizon.png'}/>
        }
        
        <h5>
          {`산책 예정 시간: ${moment(korTime)
            .format('YYYY-MM-DD HH:mm')
            .substring(0, 10)} ${moment(korTime)
            .format('YYYY-MM-DD HH:mm')
            .substring(11, 13)}시${moment(korTime)
            .format('YYYY-MM-DD HH:mm')
            .substring(14, 16)}분`}
        </h5>
        <h6>{`${post.region1} ${post.region2} ${post.region3}`}</h6>
      </DisplayWrapper>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: 500px;
  height: 300px;
  margin: 20px auto;
`;
const DisplayWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgInner = styled.img`
  width: 500px;
  height: 300px;
`;

const MiddleSectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
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
  grid-template-columns: 1fr 1fr;
`;

const MatchingLists = ({ loadingList, list, userInfo }) => {
  console.log('user', list, userInfo);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const searchKeyword = (e) => {
    setKeyword(e.target.value);
    if(e.code == 'Enter'){
      dispatch(getMatchList(keyword), [dispatch]);
    }
  }
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
      <section>
        <h4 style={style1}>시간이 얼마 안남았어요!</h4>
        <h6 style={style2}>1시간 이내 남은 게시물 노출</h6>
        <Carousel type="matching" userInfo={userInfo}/>
      </section>
      <hr />
      <MiddleSectionWrapper>
        <div>
          {/* {'검색필터'}
          <FilterAltIcon sx={{ position: 'relative', top: '15%', mx: 1 }} /> */}
        </div>
        <SearchWrapper>
          <SearchIcon sx={{ position: 'absolute', left: '2%', top: '18%' }} />
          <MiddleInnerSearch onKeyUp={searchKeyword}/>
        </SearchWrapper>
        <Link to="/match/add">
          {'게시글 올리기'}
          <CreateIcon sx={{ position: 'relative', top: '11%', mx: 2 }} />
        </Link>
      </MiddleSectionWrapper>
      <div style={{textAlign:'center'}}>
        {userInfo.region1} {userInfo.region2}
      </div>
      <hr />
      
      {loadingList && 'loading...'}
      {!loadingList && list && (
        <MatchingListWrapper>
          {list.map((post) => (
            post.region1 == userInfo.region1 && post.region2 == userInfo.region2 ?
              <Post key={post.matchId} post={post} /> : ""
          ))}
        </MatchingListWrapper>
      )}
    </>
  );
};

export default MatchingLists;
