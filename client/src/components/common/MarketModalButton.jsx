import React, { useState } from 'react';
import styled from 'styled-components';
import MarketModal from './MarketModal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MarketModalButton = ({ buttonName }) => {
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
        <MarketModal
          visible={modalVisible}
          emptySpaceClosable={true}
          onClose={closeModal}
        >
          {buttonName}
        </MarketModal>
      )}
    </>
  );
};

export default MarketModalButton;
