import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Post = ({ post }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <StyledLink to={'/match/detail/' + post.matchId}>
      <DisplayWrapper>
        <ImgInner
          src={
            'https://media.istockphoto.com/photos/funny-friends-cute-cat-and-corgi-dog-are-lying-on-a-white-bed-picture-id1347494018?k=20&m=1347494018&s=612x612&w=0&h=ztjdI3c9A9DUAxZ7b_qgkPF7HN6FxKifCrUuQF7zz3M='
          }
          onClick={openModal}
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
  console.log('list', list);
  // 레이아웃체크용
  // const [timeoutMatchingList, setTimeoutMatchingList] = useState([
  //   'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  //   'https://media.istockphoto.com/photos/young-female-holding-cute-little-pembroke-welsh-corgi-puppy-taking-picture-id1317237255?k=20&m=1317237255&s=612x612&w=0&h=Gs4TZ5Sta3jyf_AB8Fdg0nV7elYdJowS3S8AxGVq234=',
  //   'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
  //   'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  //   'https://media.istockphoto.com/photos/funny-friends-cute-cat-and-corgi-dog-are-lying-on-a-white-bed-picture-id1347494018?k=20&m=1347494018&s=612x612&w=0&h=ztjdI3c9A9DUAxZ7b_qgkPF7HN6FxKifCrUuQF7zz3M=',
  // ]);

  const [matchingList, setMatchingList] = useState([]);

  console.log(list[0].matchImgName);
  console.log(list[1].matchImgName);
  console.log(list[2].matchImgName);

  // list.map((item) => setMatchingList(`${item}+kkk`));
  list.map((item) => console.log(item));

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
