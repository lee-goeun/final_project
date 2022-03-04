import styled from 'styled-components';

const ModalWrapperStyle = styled.div`
  .mwapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #d5222270;
    backdrop-filter: blur(5px);
    z-index: 90;
  }
`;

const Modal = () => {
  return (
    <ModalWrapperStyle>
      <div className="mwapper">modal</div>
    </ModalWrapperStyle>
  );
};

export default Modal;
