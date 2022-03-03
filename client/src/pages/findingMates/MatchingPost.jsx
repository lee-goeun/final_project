import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserAvatar from '../../components/common/UserAvatar';
import MatchingModalButton from '../../components/common/MatchingModalButton';

const MatchingPost = ({ item, loadingItem }) => {
  console.log(item, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  const { matchId } = useParams();
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

  return (
    <MatchingPostWrapper>
      {loadingItem && 'loading...'}
      {!loadingItem && item && (
        <div>
          <TopWrapper>
            <UserWrapper>
              <UserAvatar sx={{ right: 10 }} />
              <h4>작성자:{item[0].user_id}</h4>
            </UserWrapper>
            <ButtonWrapper>
              <MatchingModalButton />
            </ButtonWrapper>
          </TopWrapper>
          <h4>(제목){item[0].matchContent}</h4>
          <ImgWrapper
            src={`http://localhost:3001/match/download?matchId=${item[0].matchId}&matchImgName=${item[0].matchImgName}`}
          />
          <h4>(내용):{item[0].matchContent}</h4>
          <h4>(산책시간정보):{item[0].matchTime}</h4>
          <h4>(유저정보)</h4>
          <h4>20대 | 남자 | 성남시 분당구 </h4>
          <h4>(펫정보)):{item[0].selectPet}</h4>
          <h4>코코 | 3살 | 강아지 | 포메라니안</h4>
        </div>
      )}
    </MatchingPostWrapper>
  );
};

export default MatchingPost;
