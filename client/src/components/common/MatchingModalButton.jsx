import React, { useState } from 'react';
import styled from 'styled-components';
import MatchingModal from './MatchingModal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MatchingModalButton = ({ buttonName }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const StyledButton = styled.button`
    background-color: transparent;
    border: none;
  `;

  return (
    <>
      <StyledButton>
        <MoreHorizIcon onClick={openModal} />
      </StyledButton>
      {modalVisible && (
        <MatchingModal
          visible={modalVisible}
          emptySpaceClosable={true}
          onClose={closeModal}
        >
          {buttonName}
        </MatchingModal>
      )}
    </>
  );
};

export default MatchingModalButton;
