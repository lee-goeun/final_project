import Header from '../components/Header';
import Footer from '../components/Footer';
import PostBackground from '../components/Post';
import styled from 'styled-components';

const ImgContStyle = styled.div`
  div {
    margin: 50px auto 0 auto;
    width: 100%;
    height: 500px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    h1 {
      color: white;
      position: relative;
      bottom: 300px;
      left: 20%;
    }
  }
`;

const PostPage = () => {
  return (
    <>
      <Header />
      <ImgContStyle>
        <div>
          <img
            src={process.env.PUBLIC_URL + '/img/pets.jpg'}
            alt="페이지 이미지"
          />
          <h1>반려인들과 즐거운 소통을 나눠보세요</h1>
        </div>
      </ImgContStyle>
      <PostBackground />
      <Footer />
    </>
  );
};

export default PostPage;
