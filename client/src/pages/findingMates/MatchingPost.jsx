import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserAvatar from '../../components/common/UserAvatar';
import MatchingModalButton from '../../components/common/MatchingModalButton';
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

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

const marginStyle1 = {
  marginTop: 20,
  marginBottom: 20,
};

const marginStyle2 = {
  marginTop: 5,
  marginBottom: 5,
};

const MatchingPost = ({ item, loadingItem }) => {

  const navigate = useNavigate();
  console.log("item", item);
  const addChat = () => {
     axios.post('http://localhost:3001/chat/add', {
      matchId : item[0].matchId,
      userId : item[0].userId, // 게시글 작성자
      participant:localStorage.getItem("userId") // 로그인 사람
    }).then((res) => {
      if (res.status == 200) {
        alert('채팅에 참여했습니다.');
        navigate('/chatting');
      }
    });
  }
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
            {`산책 예정 시간: ${moment(new Date(item[0].matchTime))
              .format('YYYY-MM-DD HH:mm')
              .substring(0, 10)} ${moment(new Date(item[0].matchTime))
              .format('YYYY-MM-DD HH:mm')
              .substring(11, 13)}시${moment(new Date(item[0].matchTime))
              .format('YYYY-MM-DD HH:mm')
              .substring(14, 16)}분`}
          </h6>
          <h6 style={marginStyle2}>
            20대 | 남자 |
            {`${item[0].region1} ${item[0].region2}  ${item[0].region3}`}
          </h6>
          <h6 style={marginStyle2}>(펫정보)):{item[0].selectPet}</h6>
          <h6 style={marginStyle2}>코코 | 3살 | 강아지 | 포메라니안</h6>
          <StyledButton style={marginStyle1}>
            <StyledLink to="" onClick={addChat}>
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
