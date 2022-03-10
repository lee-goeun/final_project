import styled from 'styled-components';
import UserAvatar from '../../components/common/UserAvatar';
import MarketModalButton from '../../components/common/MarketModalButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const MarketPostWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ImgWrapper = styled.img`
  height: 450px;
  width: 700px;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  height: 100%;
  display: flex;
  align-items: center;
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

const ItemPost = ({ post, loadingPost }) => {
  console.log('post',post)
  const navigate = useNavigate();

  const buyItem = () => {
    axios.post('http://localhost:3001/chat/add', {
     matchId : post[0].matchId,
     userId : post[0].userId,
     participant:localStorage.getItem("userId")
   }).then((res) => {
     if (res.status == 200) {
        navigate('/chatting');
       console.log('re', res)
     }
   });
 }

  return (
    <MarketPostWrapper>
      {loadingPost && 'loading...'}
      {!loadingPost && post && (
        <div>
          <TopWrapper>
            <UserWrapper>
              <UserAvatar sx={{ right: 10 }} />
              <h4>작성자:{post[0].userNick}</h4>
            </UserWrapper>
            <ButtonWrapper>
              <MarketModalButton />
            </ButtonWrapper>
          </TopWrapper>
          <h2 style={marginStyle1}>{post[0].marketTitle}</h2>
          <ImgWrapper
            src={`http://localhost:3001/market/download?marketId=${post[0].marketId}&marketImgName=${post[0].marketImgName}`}
          />
          <h4 style={marginStyle1}>{post[0].marketContent}</h4>
          <h6 style={marginStyle2}>{post[0].price} 원</h6>
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
