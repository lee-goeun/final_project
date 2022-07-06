import { useEffect } from 'react';
import { connect } from 'react-redux';
import MarketLists from '../../pages/usedMarket/ItemLists';
import { getMarketList } from '../modules/market';
import { useParams } from 'react-router-dom';

const MarketListsContainer = ({ getMarketList, list, loadingList, userInfo }) => {
  const { keyword } = useParams();
  
  const data = {userId : userInfo.userId, order:'created', keyword : keyword};
  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMarketList(data);
        //추후 검색이걸로구현 1대신 검색key값 넣어야함
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMarketList]);

  return <MarketLists list={list} loadingList={loadingList} userInfo={userInfo} />;
};

export default connect(
  ({ market, loading }) => ({
    list: market.list,

    loadingList: loading['market/GET_LIST'],
  }),
  {
    getMarketList,
  },
)(MarketListsContainer);
