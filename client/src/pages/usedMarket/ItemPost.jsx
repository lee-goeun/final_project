import styled from 'styled-components';
import UserAvatar from '../../components/common/UserAvatar';
import MarketModalButton from '../../components/common/MarketModalButton';
import ChatIcon from '@mui/icons-material/Chat';
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
  const navigate = useNavigate();

  return (
    <MarketPostWrapper>
      {loadingPost && 'loading...'}
      {!loadingPost && post && (
        <div>
          <TopWrapper>
            <UserWrapper>
              <UserAvatar sx={{ right: 10 }} />
              <h4>작성자:{post[0].userId}</h4>
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
          <h6 style={marginStyle2}>
            20대 | 남자 |
            {`${post[0].region1} ${post[0].region2}  ${post[0].region3}`}
          </h6>
          <h6 style={marginStyle2}>(펫정보)):{post[0].selectPet}</h6>
          <h6 style={marginStyle2}>코코 | 3살 | 강아지 | 포메라니안</h6>
        </div>
      )}
    </MarketPostWrapper>
  );
};

export default ItemPost;
