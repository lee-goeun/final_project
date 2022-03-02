import { useEffect } from 'react';
import { connect } from 'react-redux';
import MatchingLists from '../../pages/findingMates/MatchingLists';
import { getMatchList, getMatchItem } from '../modules/matching';

const MatchingListsContainer = ({
  getMatchList,
  getMatchItem,
  list,
  loadingList,
}) => {
  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMatchList(1);
        //추후 검색이걸로구현 1대신 검색key값 넣어야함
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMatchList, getMatchItem]);

  return <MatchingLists list={list} loadingList={loadingList} />;
};

export default connect(
  ({ matching, loading }) => ({
    list: matching.list,

    loadingList: loading['matching/GET_LIST'],
  }),
  {
    getMatchList,
  },
)(MatchingListsContainer);
