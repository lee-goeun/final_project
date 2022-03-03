import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Post = ({ post }) => {
  // 모달형식으로 링크작업 추후
  // const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   setModalVisible(true);
  // };
  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  return (
    <StyledLink to={'/match/detail/' + post.matchId}>
      <DisplayWrapper>
        <ImgInner
          src={
            'http://localhost:3001/match/download?matchId=' +
            post.matchId +
            '&matchImgName=' +
            post.matchImgName
          }
          // onClick={openModal}
        />
        <h6>
          산책시간:{post.matchTime}제목:{post.matchTitle}
        </h6>
        <h6>위치:'null'</h6>
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

const SectionWrapper = styled.section`
  width: 500px;
  height: 300px;
  margin: 20px auto;
`;

const TimeoutListWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

const MatchingLists = ({ loadingList, list }) => {
  const [matchingList, setMatchingList] = useState([]);

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
        <Carousel />
        {/* {loadingItem && 'loading...'}
        {!loadingItem && item && (
          <TimeoutListWrapper>
            {timeoutList.map((timeoutPost)=>(<Post key={timeoutPost.matchId} post={timeoutPost}>))}
          </TimeoutListWrapper>
        )} */}
      </section>
      <hr />
      <MiddleSectionWrapper>
        <div>
          {'검색필터'}
          <FilterAltIcon sx={{ position: 'relative', top: '15%', mx: 1 }} />
        </div>
        <SearchWrapper>
          <SearchIcon sx={{ position: 'absolute', left: '2%', top: '18%' }} />
          <MiddleInnerSearch />
        </SearchWrapper>
        <Link to="/match/add">
          {'게시글 올리기'}
          <CreateIcon sx={{ position: 'relative', top: '11%', mx: 2 }} />
        </Link>
      </MiddleSectionWrapper>
      <hr />
      {loadingList && 'loading...'}
      {!loadingList && list && (
        <MatchingListWrapper>
          {list.map((post) => (
            <Post key={post.matchId} post={post} />
          ))}
        </MatchingListWrapper>
      )}
    </>
  );
};

export default MatchingLists;
