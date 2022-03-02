import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMatchItem } from '../../redux/modules/matching';

const MatchingPost = ({ item, loadingItem }) => {
  const { matchId } = useParams();

  // console.log(matchId);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMatchItem(1));
  // }, [dispatch]);

  // const item = useSelector((state) => state.matching.item);
  // const loadingItem = useSelector((state) => state.matching.loading);

  return (
    <section>
      <h1>POST DETAIL</h1>
      {loadingItem && 'loading...'}
      {!loadingItem && item && (
        <div>
          <h4>작성자:{item[0].user_id}</h4>
          <h2>제목:{item[0].matchTitle}</h2>
          <h4>내용:{item[0].matchContent}</h4>
          <h4>시간:{item[0].matchTime}</h4>
          <h4>펫종류:{item[0].selectPet}</h4>
          <h4>matchImgName:{item[0].matchImgName}</h4>
          <button>포스트삭제</button>
          <button>포스트 수정</button>
        </div>
      )}
    </section>
  );
};

export default MatchingPost;
