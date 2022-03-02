import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../../components/common/Carousel';
import { getMatchList } from '../../lib/api';
import axios from 'axios';

// const Post = ({ post }) => {
//   return (
//     <section>
//       <Link to={'/match/detail/' + post.matchId}>
//         제목:{post.matchTitle} 내용:{post.matchContent}
//         이미지url로 와야함. 이미지url렌더링장소 이미지 클릭시 상세페이지로 이동
//       </Link>
//     </section>
//   );
// };

const Post = ({ img }) => {
  return (
    <section>
      <Link to={'/match/detail/'}>
        <img src={`${img}`} />
      </Link>
    </section>
  );
};

const TimeoutListWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const MatchingListWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

 const MatchingLists = () => {
  const [matchingList, setMatchingList] = useState([]);
  
  React.useEffect(() => {
    getMatchingList();
  },[]);

  const getMatchingList = async () => {
    let res = await axios.get('http://localhost:3001/match/list');
    console.log('res',res);
    setMatchingList(res.data);
  }
  
  
  return (
    <>
     <section>
        <span>시간이 얼마 안남았어요!</span>
        <span>1시간 이내 남은 게시물 노출</span>
        <Carousel />
        {/* {loadingItem && 'loading...'}
        {!loadingItem && item && (
          <TimeoutListWrapper>
            {timeoutList.map((timeoutPost)=>(<Post key={timeoutPost.matchId} post={timeoutPost}>))}
          </TimeoutListWrapper>
        )} */}
      </section>
      <hr />

      <span>필터////</span>
      <span>검색////</span>
      <Link to="/match/add">글쓰기</Link>
      <hr />
      <MatchingListWrapper>
      {matchingList.map(match => (
        <section>
          <Link to={'/match/detail/'}>
          <img src={"http://localhost:3001/match/download?matchId=" + match.matchId +"&matchImgName=" + match.matchImgName}/>
          </Link>
        </section>
      ))}
      </MatchingListWrapper>
      {/* {loadingList && 'loading...'}
      {!loadingList && list && (
        <MatchingListWrapper>
          {list.map((post) => (
            <Post key={post.matchId} post={post} />
          ))}
        </MatchingListWrapper>
      )} */}
    </>
  );
};
export default MatchingLists;