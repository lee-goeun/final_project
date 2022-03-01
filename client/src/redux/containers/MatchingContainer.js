import { useEffect } from 'react';
import { connect } from 'react-redux';
import MatchingLists from '../../pages/findingMates/MatchingLists';
import { getMatchList, getMatchItem } from '../modules/matching';

const MatchingContainer = ({
  getMatchList,
  getMatchItem,
  list,
  item,
  loadingList,
  loadingItem,
}) => {
  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMatchList(1);
        await getMatchItem(1);
        //나중에 1대신 matchId넣어야함
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMatchList, getMatchItem]);

  return (
    <MatchingLists
      list={list}
      item={item}
      loadingList={loadingList}
      loadingItem={loadingItem}
    />
  );
};

export default connect(
  ({ matching, loading }) => ({
    list: matching.list,
    item: matching.item,
    loadingList: loading['matching/GET_LIST'],
    loadingItem: loading['matching/GET_ITEM'],
  }),
  {
    getMatchList,
    getMatchItem,
  },
)(MatchingContainer);
