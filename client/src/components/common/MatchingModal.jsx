import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMatchPost } from '../../redux/modules/matching';
import { useNavigate } from 'react-router-dom';
import { setOriginalPost } from '../../redux/modules/matching';

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const MatchingModal = ({
  className,
  onClose,
  emptySpaceClosable,
  visible,
  children,
}) => {
  const onEmptySpaceClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state) => state.matching.post);

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  const onUpdate = () => {
    dispatch(setOriginalPost(post[0]));
    navigate('/match/add');
  };

  const onDelete = () => {
    dispatch(deleteMatchPost(post[0].matchId), [dispatch]);
    navigate('/match/list');
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={emptySpaceClosable ? onEmptySpaceClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <h3>{children}</h3>
          <Button className="matching-modal-update" onClick={onUpdate}>
            수정
          </Button>
          <Button className="matching-modal-delete" onClick={onDelete}>
            삭제
          </Button>
          <Button className="modal-close" onClick={close}>
            취소
          </Button>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default MatchingModal;
