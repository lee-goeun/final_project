import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import moment from 'moment';

const Post = ({ post }) => {
  // 모달형식으로 링크작업 추후
  // const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   setModalVisible(true);
  // };
  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  const korTime = new Date(post.matchTime);
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
  align-item: center;
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

const ItemListWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ItemLists = ({ loadingList, list }) => {
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
        <ItemListWrapper>
          {list.map((post) => (
            <Post key={post.matchId} post={post} />
          ))}
        </ItemListWrapper>
      )}
    </>
  );
};

export default ItemLists;
