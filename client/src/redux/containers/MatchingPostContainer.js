import { useEffect } from 'react';
import { connect } from 'react-redux';
import MatchingPost from '../../pages/findingMates/MatchingPost';
import { getMatchPost } from '../modules/matching';
import { useParams } from 'react-router-dom';

const MatchingPostContainer = ({ getMatchPost, post, loadingPost, userInfo }) => {
  const { matchId } = useParams();

  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMatchPost(matchId);
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMatchPost]);

  return <MatchingPost post={post} loadingPost={loadingPost} userInfo={userInfo}/>;
};

export default connect(
  ({ matching, loading }) => ({
    post: matching.post,
    loadingPost: loading['matching/GET_POST'],
  }),
  {
    getMatchPost,
  },
)(MatchingPostContainer);
