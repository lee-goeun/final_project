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
  }
`;

const PostPage = () => {
  return (
    <>
      <Header />
      <ImgContStyle>
        <div>
          <img src={process.env.PUBLIC_URL + '/img/pets.jpg'} />
        </div>
      </ImgContStyle>
      <PostBackground />
      <Footer />
    </>
  );
};

export default PostPage;
