import { PostContainer } from '../components/Post';
import styled from 'styled-components';

const DetailStyle = styled.div`
  .post-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -65%);
  }
`;

const DetailPost = () => {
  return (
    <div>
      <DetailStyle>
        <PostContainer />
      </DetailStyle>
    </div>
  );
};

export default DetailPost;
