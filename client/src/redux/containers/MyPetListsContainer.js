import { useEffect } from 'react';
import { connect } from 'react-redux';
import PetContainer from '../../components/mypage/PetContainer';
import { getMyPetList } from '../modules/mypet';

const MyPetListsContainer = ({ getMyPetList, list, loadingList, userInfo }) => {
  console.log(userInfo);
  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMyPetList(userInfo.userId);
        
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMyPetList]);

  return <PetContainer list={list} loadingList={loadingList} userInfo={userInfo} />;
};

export default connect(
  ({ mypet, loading, userInfo }) => ({
    list: mypet.list,
    loadingList: loading['mypet/GET_LIST']
  }),
  {
    getMyPetList,
  },
)(MyPetListsContainer);
