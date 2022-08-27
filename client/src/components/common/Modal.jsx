import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getPost } from '../../lib/api';

const ModalWrapperStyle = styled.div`
  .mwapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
  }
`;

/** 모달창 배경 (불투명 검은 바탕)  */
export const ModalWrapper = ({ innerModal }) => {
  return (
    <ModalWrapperStyle>
      <div className="mwapper">{innerModal}</div>
    </ModalWrapperStyle>
  );
};

/** 일반게시물 신고 모달창  */
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

/** 일반게시물 수정 모달창  */
export const ModifyPostModal = ({
  clickModifyPostCancel,
  categoryIndex,
  boardTitle,
  boardContent,
  boardId,
  userNick,
  userId,
  post
}) => {

  const [postModifyTitle, setPostModifyTitle] = useState('');
  const [postModifyContent, setPostModifyContent] = useState('');
  console.log('post',post, clickModifyPostCancel);
  useEffect(() => {
    getPost(boardId);
    axios.get(`http://localhost:3001/board/post/${post.boardId}`, {
      params: { userId: userInfo.userId },
    })
    .then((res) => {
      setPostModifyTitle(res.data.boardTitle);
      setPostModifyContent(res.data.boardContent);
      console.log('따로aixos 찍어본것', res);
    })
    .catch((e) => console.log(e));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardTitle, boardContent]);

  /** 임시 추가  */
  useEffect(() => {
    getAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userInfo, setUserInfo] = useState({
    auth: false,
    userId: '',
    userNick: '',
    userEmail: '',
    userName: '',
    region1: '',
    region2: '',
    region3: '',
    userImg: '',
  });

  const getAuth = async () => {
    try {
      const tokenValidationResponse = await axios({
        url: 'http://localhost:3001/auth/auth',
        method: 'get',
        headers: { 'x-access-token': localStorage.getItem('token') },
      });
      userInfoHandler(tokenValidationResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const userInfoHandler = ({ data }) => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        auth: data.auth,
        userId: data.userId,
        userNick: data.userNick,
        userName: data.userName,
        region1: data.region1,
        region2: data.region2,
        region3: data.region3,
        userImg: data.userImg,
        /** 필요한 유저 정보 이곳에다가 추가(백엔드 authController에서도 추가해야함)  */
      };
    });
  };
  const currentUserId = userInfo.userId;

  // 임시 추가

  const postModify= async(e)=>{
    console.log(boardId)
    const param = {
      boardId : post.boardId,
      userId:currentUserId,
      boardTitle:postModifyTitle,
      boardContent:postModifyContent,
    };
    console.log('param', param);
    await axios
    .put(`http://localhost:3001/board/post/edit/${post.boardId}`, param)
    .then((res) => {
      console.log(res);
      alert('수정되었습니다.');
      clickModifyPostCancel();
    })
    .catch((err) => {
      console.log('게시글 수정 에러 : ', err);
      alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
    });
  };
  


  return (
    <ModalWrapper
      innerModal={
        <div className="edit-post-modal">
          
          <input type="text" value={postModifyTitle}/>
          {/* 게시물 텍스트 들어갈 곳 표기 */}
          <textarea
          onChange = {(e)=> setPostModifyContent(e.target.value)}
          value={postModifyContent}></textarea>
          <button className="edit-post-cancel" onClick={clickModifyPostCancel}>
            취소
          </button>
          <button className="edit-post-confirm" onClick={postModify}>
            수정
          </button>
        </div>
      }
    />
  );
};



/** 일반게시물 삭제 모달창  */
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
