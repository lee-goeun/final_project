import { useEffect } from 'react';
import { connect } from 'react-redux';
import MarketPost from '../../pages/usedMarket/ItemPost';
import { getMarketPost } from '../modules/market';
import { useParams } from 'react-router-dom';

const MarketPostContainer = ({ getMarketPost, post, loadingPost }) => {
  console.log("getMarketPost",getMarketPost);
  const { market } = useParams();

  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMarketPost(market);
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMarketPost]);

  return <MarketPost post={post} loadingPost={loadingPost} />;
};

export default connect(
  ({ market, loading }) => ({
    post: market.post,
    loadingPost: loading['market/GET_POST'],
  }),
  {
    getMarketPost,
  },
)(MarketPostContainer);
