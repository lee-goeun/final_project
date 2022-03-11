import { useEffect } from 'react';
import { connect } from 'react-redux';
import MyPetLists from '../../components/mypage/PetContainer';
import { getMyPetList } from '../modules/mypet';

const MyPetListsContainer = ({ getMyPetList, list, loadingList }) => {
  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMyPetList(1);
        //추후 검색이걸로구현 1대신 검색key값 넣어야함
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMyPetList]);

  return <MyPetLists list={list} loadingList={loadingList} />;
};

export default connect(
  ({ mypet, loading }) => ({
    list: mypet.list,

    loadingList: loading['mypet/GET_LIST'],
  }),
  {
    getMyPetList,
  },
)(MyPetListsContainer);
