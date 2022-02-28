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

const ImageViewer = ({ image }) => {
  return <div>{image && <ImageWrapper src={image} alt="업로드 이미지" />}</div>;
};

export default ImageViewer;
