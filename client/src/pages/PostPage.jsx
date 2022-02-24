import Header from '../components/Header';
import Footer from '../components/Footer';
import { PostContainer, MiniPostContainer, PostBackground } from '../components/Post';
import Carousel from '../components/Carousel';

const PostPage = () => {
  return (
    <>
      <Header />
      <PostBackground />
      <Carousel />
      <Footer />
    </>
  );
};

export default PostPage;
