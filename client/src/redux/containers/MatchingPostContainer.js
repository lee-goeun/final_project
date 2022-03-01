import { useEffect } from 'react';
import { connect } from 'react-redux';
import MatchingPost from '../../pages/findingMates/MatchingPost';
import { getMatchItem } from '../modules/matching';
import { useParams } from 'react-router-dom';

const MatchingPostContainer = ({ getMatchItem, item, loadingItem }) => {
  const { matchId } = useParams();

  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMatchItem(matchId);
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMatchItem]);

  return <MatchingPost item={item} loadingItem={loadingItem} />;
};

export default connect(
  ({ matching, loading }) => ({
    item: matching.item,
    loadingItem: loading['matching/GET_ITEM'],
  }),
  {
    getMatchItem,
  },
)(MatchingPostContainer);
