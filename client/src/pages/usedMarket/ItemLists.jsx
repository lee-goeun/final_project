import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getMarketList } from '../../redux/modules/market'


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
        <h3>{`${post.marketTitle}`}</h3>
        <h6>{`${post.price}`} 원</h6>
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
  placeholder: '물품 검색하기',
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
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  const searchKeyword = (e) => {
    setKeyword(e.target.value);
    console.log('e', keyword);
    console.log('dddd', e);
    if(e.code == 'Enter'){
      dispatch(getMarketList(keyword), [dispatch]);
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
        <h4 style={style1}>지금 가장 HOT한 중고물품</h4>
        <Carousel />
      </section>
      <hr />
      <MiddleSectionWrapper>
        <div>
          {'관심도 높은순'}
          <FilterAltIcon sx={{ position: 'relative', top: '15%', mx: 1 }} />
        </div>
        <SearchWrapper>
          <SearchIcon sx={{ position: 'absolute', left: '2%', top: '18%' }} />
          <MiddleInnerSearch onKeyUp={searchKeyword}/>
        </SearchWrapper>
        <Link to="/market/add">
          {'중고거래 올리기'}
          <CreateIcon sx={{ position: 'relative', top: '11%', mx: 2 }} />
        </Link>
      </MiddleSectionWrapper>
      <hr />
      {loadingList && 'loading...'}
      {!loadingList && list && (
        <ItemListWrapper>
          {list.map((post) => (
            <Post key={post.marketId} post={post} />
          ))}
        </ItemListWrapper>
      )}
    </>
  );
};

export default ItemLists;
