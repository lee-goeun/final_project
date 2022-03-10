import { useEffect } from 'react';
import { connect } from 'react-redux';
import MarketLists from '../../pages/usedMarket/ItemLists';
import { getMarketList } from '../modules/market';

const MarketListsContainer = ({ getMarketList, list, loadingList }) => {
  console.log('marketLit', getMarketList);
  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMarketList(1);
        //추후 검색이걸로구현 1대신 검색key값 넣어야함
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMarketList]);

  return <MarketLists list={list} loadingList={loadingList} />;
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
