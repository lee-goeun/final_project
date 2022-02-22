import React, { useState } from 'react';
import ProfileModal from './ProfileModal';

const ProfileModalButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <button onClick={openModal}>프로필 사진 바꾸기</button>
      {modalVisible && (
        <ProfileModal
          visible={modalVisible}
          emptySpaceClosable={true}
          onClose={closeModal}
        >
          프로필 사진 바꾸기
        </ProfileModal>
      )}
    </>
  );
};

export default ProfileModalButton;
