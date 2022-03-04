import { PostContainer } from '../components/Post';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  createSearchParams,
  Link,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DetailStyle = styled.div`
  .post-container {
    margin: 220px auto 100px auto;
  }
  .back-to-list-btn {
    font-size: 50px;
    margin: 0 auto 80px auto;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: var(--accent-default);
    transition: 0.3s;
  }
  .back-to-list-btn:hover {
    animation: move-btn 0.5s alternate infinite;
  }
  @keyframes move-btn {
    from {
      /* transform: translateX(0); */
    }
    to {
      transform: translateX(-30px);
    }
  }
`;

const DetailPost = () => {
  const { boardId } = useParams();
  const [getBoard, setGetBoard] = useState();

  useEffect(() => {
    console.log('상세보기 렌더링');
    axios
      .get('http://localhost:3001/board/post/' + boardId)
      .then((res) => setGetBoard(res.data));
  }, []);

  return (
    <div>
      <DetailStyle>
        <PostContainer />
        <Link to="/post">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="back-to-list-btn"
            title="뒤로가기"
          />
        </Link>
      </DetailStyle>
    </div>
  );
};

export default DetailPost;
