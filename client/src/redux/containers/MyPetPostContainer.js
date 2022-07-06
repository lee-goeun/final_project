import { useEffect } from 'react';
import { connect } from 'react-redux';
import MyPetPost from '../../components/mypage/AddPetForm';
import { getMyPetPost } from '../modules/mypet';
import { useParams } from 'react-router-dom';

const MyPetPostContainer = ({ getMyPetPost, post, loadingPost }) => {
  const { petId } = useParams();

  useEffect(() => {
    //useEffect안에서 async 사용을 위해 fn생성
    const fn = async () => {
      try {
        await getMyPetPost(petId);
      } catch (e) {
        console.log(e); //showing error on console
      }
    };
    fn();
  }, [getMyPetPost]);

  return <MyPetPost post={post} loadingPost={loadingPost} />;
};

export default connect(
  ({ mypet, loading }) => ({
    post: mypet.post,
    loadingPost: loading['mypet/GET_POST'],
  }),
  {
    getMyPetPost,
  },
)(MyPetPostContainer);
