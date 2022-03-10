import { useEffect } from 'react';
import styled from 'styled-components';

// const ImageWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 20rem;
//   max-height: 20rem;
// `;

const ImageWrapper = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 20rem;
  max-height: 20rem;
  margin: 0.5rem 3rem;
`;

const ImageViewer = ({ post, imageUrl }) => {
  console.log(post, imageUrl, '99999999999999999999999999999999999999');

  return (
    <div>
      {(imageUrl && <ImageWrapper src={imageUrl} alt="업로드 이미지" />) ||
        (post.imageUrl && (
          <ImageWrapper src={post.imageUrl} alt="업로드 이미지" />
        )) || post.matchId ? 
        (post.matchId && (
          <ImageWrapper
            //db에 있어야 name으로 불러올수가 있음
            //얘를 state에 url로 넣어서 url로 처리를 하자.
            src={`http://localhost:3001/match/download?matchId=${post.matchId}&matchImgName=${post.matchImgName}`}
            alt="업로드 이미지"
          />
        )) : (post.marketId && (
          <ImageWrapper
            //db에 있어야 name으로 불러올수가 있음
            //얘를 state에 url로 넣어서 url로 처리를 하자.
            src={`http://localhost:3001/market/download?marketId=${post.marketId}&marketImgName=${post.marketImgName}`}
            alt="업로드 이미지"
          />
        ))}
    </div>
  );
};

export default ImageViewer;
