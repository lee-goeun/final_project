import styled from 'styled-components';

const ModalWrapperStyle = styled.div`
  .mwapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(5px);
  }
`;

// 모달창 배경 (불투명 검은 바탕)
export const ModalWrapper = ({ innerModal }) => {
  return (
    <ModalWrapperStyle>
      <div className="mwapper">{innerModal}</div>
    </ModalWrapperStyle>
  );
};

// 일반게시물 신고 모달창
export const ReportPostModal = ({
  clickReportPostCancel,
  clickReportPostConfirm,
}) => {
  return (
    <ModalWrapper
      innerModal={
        <div className="report-post-modal">
          <p>정말 게시물을 신고하시겠습니까?</p>
          <button
            className="report-post-cancel"
            onClick={clickReportPostCancel}
          >
            취소
          </button>
          <button
            className="report-post-confirm"
            onClick={clickReportPostConfirm}
          >
            신고
          </button>
        </div>
      }
    />
  );
};

// 일반게시물 수정 모달창
export const ModifyPostModal = ({
  clickModifyPostCancel,
  clickModifyPostConfirm,
}) => {
  return (
    <ModalWrapper
      innerModal={
        <div className="edit-post-modal">
       {/* 게시물 텍스트 들어갈 곳 표기 */}
          <textarea>기존 텍스트</textarea>
          <button className="edit-post-cancel" onClick={clickModifyPostCancel}>
            취소
          </button>
          <button
            className="edit-post-confirm"
            onClick={clickModifyPostConfirm}
          >
            수정
          </button>
        </div>
      }
    />
  );
};

// 일반게시물 삭제 모달창
export const DeletePostModal = ({
  clickDeletePostCancel,
  clickDeletePostConfirm,
}) => {
  return (
    <ModalWrapper
      innerModal={
        <div className="delete-modal">
          <p>정말 게시물을 삭제하시겠습니까?</p>
          <button className="delete-cancel" onClick={clickDeletePostCancel}>
            취소
          </button>
          <button className="delete-confirm" onClick={clickDeletePostConfirm}>
            삭제
          </button>
        </div>
      }
    />
  );
};
