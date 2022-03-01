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
    getMatchList();
    getMatchItem(1);
    //나중에 1대신 matchId넣어야함
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
  ({ matching }) => ({
    list: matching.list,
    item: matching.item,
    loadingList: matching.loading.GET_LIST,
    loadingItem: matching.loading.GET_ITEM,
  }),
  {
    getMatchList,
    getMatchItem,
  },
)(MatchingContainer);
