import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserAvatar from '../../components/common/UserAvatar';
import MatchingModalButton from '../../components/common/MatchingModalButton';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

const MatchingPost = ({ item, loadingItem }) => {
  console.log(item, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

  // console.log(matchId);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMatchItem(1));
  // }, [dispatch]);

  // const item = useSelector((state) => state.matching.item);
  // const loadingItem = useSelector((state) => state.matching.loading);

  const MatchingPostWrapper = styled.section`
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

  console.log(item, '@@@@@@@@@@@@@@@@@@@@@@');

  const marginStyle1 = {
    marginTop: 20,
    marginBottom: 20,
  };

  const marginStyle2 = {
    marginTop: 5,
    marginBottom: 5,
  };

  return (
    <MatchingPostWrapper>
      {loadingItem && 'loading...'}
      {!loadingItem && item && (
        <div>
          <TopWrapper>
            <UserWrapper>
              <UserAvatar sx={{ right: 10 }} />
              <h4>작성자:{item[0].userId}</h4>
            </UserWrapper>
            <ButtonWrapper>
              <MatchingModalButton />
            </ButtonWrapper>
          </TopWrapper>
          <h2 style={marginStyle1}>{item[0].matchTitle}</h2>
          <ImgWrapper
            src={`http://localhost:3001/match/download?matchId=${item[0].matchId}&matchImgName=${item[0].matchImgName}`}
          />
          <h4 style={marginStyle1}>{item[0].matchContent}</h4>
          <h6 style={marginStyle2}>
            {`산책 예정 시간: ${item[0].matchTime.substring(
              0,
              10,
            )} ${item[0].matchTime.substring(
              11,
              13,
            )}시${item[0].matchTime.substring(14, 16)}분`}
          </h6>
          <h6 style={marginStyle2}>
            20대 | 남자 |
            {`${item[0].region1} ${item[0].region2}  ${item[0].region3}`}
          </h6>
          <h6 style={marginStyle2}>(펫정보)):{item[0].selectPet}</h6>
          <h6 style={marginStyle2}>코코 | 3살 | 강아지 | 포메라니안</h6>
          <StyledButton style={marginStyle1}>
            <StyledLink to="/chatting">
              <h3>채팅하기</h3>
              <ChatIcon sx={{ top: 100 }} />
            </StyledLink>
          </StyledButton>
        </div>
      )}
    </MatchingPostWrapper>
  );
};

export default MatchingPost;
