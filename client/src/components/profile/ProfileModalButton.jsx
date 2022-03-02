import React, { useState } from 'react';
import Button from '../common/Button';
import ProfileModal from './ProfileModal';

const ProfileModalButton = ({ buttonName }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button type="button" onClick={openModal}>
        {buttonName}
      </Button>

      {modalVisible && (
        <ProfileModal
          visible={modalVisible}
          emptySpaceClosable={true}
          onClose={closeModal}
        >
          {buttonName}
        </ProfileModal>
      )}
    </>
  );
};

export default ProfileModalButton;
