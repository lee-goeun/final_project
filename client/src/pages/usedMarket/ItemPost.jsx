import styled from 'styled-components';
import UserAvatar from '../../components/common/UserAvatar';
import MarketModalButton from '../../components/common/MarketModalButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sellingMarketPost } from '../../redux/modules/market';

const MarketPostWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  background-color: white;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  width: 600px;
  margin: 120px auto;

  .tit {
    padding: 0 20px;
  }
  .cont {
    width: 100%;
    height: fit-content;
    padding: 0 20px;
  }
  h4 {
    display: inline-block;
    position: relative;
    top: 50px;
    left: 10px;
  }
  .img-con {
    width: 600px;
    height: 600px;
    background-color: rgb(30, 30, 30);
  }
`;

const TopWrapper = styled.div`
  background-color: rgb(245, 245, 245);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ImgWrapper = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const StyledButton = styled.button`
  background-color: transparent;
  padding: 5px 10px;
  border: none;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 470px;
  :hover {
    background-color: rgb(252, 252, 252);
  }
  h3 {
    margin-right: 5px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
`;

const marginStyle1 = {
  marginTop: 20,
  marginBottom: 20,
};

const marginStyle2 = {
  marginTop: 5,
  marginBottom: 5,
};

const ItemPost = ({ post, loadingPost, userInfo }) => {
  const dispatch = useDispatch();

  const buyItem = () => {
    const cnfrm = window.confirm('구매하시겠습니까?');
    const data = {
      marketId: post[0].marketId,
      userId: post[0].userId,
      sellerId: userInfo.userId,
    };
    console.log('dat', data);
    if (cnfrm) {
      dispatch(sellingMarketPost(data), [dispatch]);
    }
  };

  return (
    <MarketPostWrapper>
      {loadingPost && 'loading...'}
      {!loadingPost && post && (
        <div>
          <TopWrapper>
            <UserWrapper>
              <UserAvatar sx={{ right: 10 }} />
              <h3>{post[0].userNick}</h3>
            </UserWrapper>
            <ButtonWrapper>
              <MarketModalButton />
            </ButtonWrapper>
          </TopWrapper>
          <div className="tit">
            <h3 style={marginStyle1}>{post[0].marketTitle}</h3>
          </div>
          <div className="img-con">
            <ImgWrapper
              src={`http://localhost:3001/market/download?marketId=${post[0].marketId}&marketImgName=${post[0].marketImgName}`}
            />
          </div>
          <div className="cont">
            <p style={marginStyle1}>{post[0].marketContent}</p>
            <h4 style={marginStyle2}>
              <small>판매금액</small> {post[0].price} 원
            </h4>
          </div>
          <StyledButton style={marginStyle1}>
            <StyledLink to="" onClick={buyItem}>
              <h3>구매하기</h3>
              <ShoppingCartIcon sx={{ top: 100 }} />
            </StyledLink>
          </StyledButton>
        </div>
      )}
    </MarketPostWrapper>
  );
};

export default ItemPost;
