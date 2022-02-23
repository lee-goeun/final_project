import { connect } from 'react-redux';
import ProfileImgButtons from '../../components/ProfileImgButtons';

const ProfileImgButtonsContainer = ({ user_img, upload, remove }) => {
  return (
    <ProfileImgButtons
      user_img={user_img}
      onUpload={upload}
      onRemove={remove}
    />
  );
};
//store의(modules/index.js) 상태를 컴포넌트의 props로 전달
// const mapStateToProps = (state) => ({
//   user_img: state.ProfileImgButtons.user_img,
// });
//action creator를 컴포넌트의 props로 전달
const mapDispatchToProps = (dispatch) => ({
  upload: () => {
    console.log('upload');
  },
  remove: () => {
    console.log('remove');
  },
});

export default connect(
  // mapStateToProps,
  mapDispatchToProps,
)(ProfileImgButtonsContainer);
