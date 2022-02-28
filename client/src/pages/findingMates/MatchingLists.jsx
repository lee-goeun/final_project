import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MatchingListItem from '../../components/findingMates/MatchingItem';
import TimeoutListItem from '../../components/findingMates/TimeoutItem';

const TimeoutListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const MatchingListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const MatchingLists = () => {
  // 레이아웃체크용
  // const [timeoutMatchingList, setTimeoutMatchingList] = useState([
  //   'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  //   'https://media.istockphoto.com/photos/young-female-holding-cute-little-pembroke-welsh-corgi-puppy-taking-picture-id1317237255?k=20&m=1317237255&s=612x612&w=0&h=Gs4TZ5Sta3jyf_AB8Fdg0nV7elYdJowS3S8AxGVq234=',
  //   'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
  //   'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  //   'https://media.istockphoto.com/photos/funny-friends-cute-cat-and-corgi-dog-are-lying-on-a-white-bed-picture-id1347494018?k=20&m=1347494018&s=612x612&w=0&h=ztjdI3c9A9DUAxZ7b_qgkPF7HN6FxKifCrUuQF7zz3M=',
  // ]);
  // const [matchingList, setMatchingList] = useState([
  //   'https://media.istockphoto.com/photos/funny-friends-cute-cat-and-corgi-dog-are-lying-on-a-white-bed-picture-id1347494018?k=20&m=1347494018&s=612x612&w=0&h=ztjdI3c9A9DUAxZ7b_qgkPF7HN6FxKifCrUuQF7zz3M=',
  //   'https://media.istockphoto.com/photos/chihuahua-dog-sleep-on-bed-picture-id958839274?k=20&m=958839274&s=612x612&w=0&h=9ZlWCfYGdVSf7PhaqyeqC79vznWXSDb9LJAWv7rxHQU=',
  //   'https://media.istockphoto.com/photos/pretty-chihuahua-puppy-dog-wearing-red-warm-sweater-in-scandinavian-picture-id1179029286?k=20&m=1179029286&s=612x612&w=0&h=-67AzuS9PC2OeN4oTFoqYP2BvSQtebhR65BRBXgj9DM=',
  //   'https://media.istockphoto.com/photos/young-female-holding-cute-little-pembroke-welsh-corgi-puppy-taking-picture-id1317237255?k=20&m=1317237255&s=612x612&w=0&h=Gs4TZ5Sta3jyf_AB8Fdg0nV7elYdJowS3S8AxGVq234=',
  //   'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
  // ]);

  const [timeoutMatchingList, setTimeoutMatchingList] = useState([]);
  const [matchingList, setMatchingList] = useState([]);

  return (
    <>
      <TimeoutListWrapper>
        {timeoutMatchingList.map((post) => (
          <TimeoutListItem post={post} />
        ))}
      </TimeoutListWrapper>
      <hr></hr>
      <h3>검색창:</h3>
      <Link to="/match/add">글쓰기</Link>
      <hr></hr>
      <MatchingListWrapper>
        {matchingList.map((post) => (
          <MatchingListItem post={post} />
        ))}
      </MatchingListWrapper>
    </>
  );
};

export default MatchingLists;
