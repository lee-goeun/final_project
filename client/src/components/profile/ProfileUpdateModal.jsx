import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../common/Modal';
import DaumPostHook from '../common/DaumPostHook';

const ProfileUpdateModalStyle = styled.div`
  .inner__cont {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 450px;
    height: fit-content;
    padding: 40px;
    animation: showing 0.3s;

    label {
      display: inline-block;
      width: 70px;
    }
    input {
      display: inline-block;
      width: 300px;
      border: 1px solid var(--bordercolor-default);
      margin-bottom: 10px;
    }
    .imgwrapper {
      width: 120px;
      height: 120px;
      border-radius: 120px;
      overflow: hidden;
      margin: 20px auto 10px auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .img__label {
      display: block;
      margin: 0 auto;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      :hover {
        background-color: var(--bgcolor-default);
      }
    }
    .btn-cont {
      display: flex;
      width: fit-content;
      margin: 20px auto 0 auto;
    }
  }
`;

const AddrInputStyle = styled.div`
  margin: -23px auto;
  input {
    display: inline-block;
    margin-left: 70px;
  }
`;

// 프로필 작업 해야하는 곳
const ProfileUpdateModal = ({ clickCancel }) => {
  const [userAddrInfo, setUserAddrInfo] = useState({
    address: '',
    zonecode: '',
    detailAddress: '',
    region1: '',
    region2: '',
    region3: '',
    extraAddress: '',
    buildingName: '',
  });

  // 하드코딩 노가다 시작

  // 이름
  // const [CommentModal, setCommentModal] = useState('');

  // useEffect(() => {
  //   setCommentModal(commentContent);
  // }, [commentContent]);


  // 닉네임
  // const [CommentModal, setCommentModal] = useState('');
  // useEffect(() => {
  //   setCommentModal(commentContent);
  // }, [commentContent]);


  // 이메일
  // const [CommentModal, setCommentModal] = useState('');
  // useEffect(() => {
  //   setCommentModal(commentContent);
  // }, [commentContent]);
  // const [CommentModal, setCommentModal] = useState('');


  // 전화번호
  // useEffect(() => {
  //   setCommentModal(commentContent);
  // }, [commentContent]);
  // const [CommentModal, setCommentModal] = useState('');

  // 상세 주소 값만
  // useEffect(() => {
  //   setCommentModal(commentContent);
  // }, [commentContent]);
  // const [CommentModal, setCommentModal] = useState('');


  // 소개








  // 하드 코딩 노가다 종료

  const { zonecode, address, detailAddress } = userAddrInfo;

  const savingAddressInput = (input) => {
    setUserAddrInfo(() => ({
      zonecode: input.zonecode,
      address: input.address + ` ${input.buildingName}`,
      detailAddress: input.detailAddress,
      region1: input.sido,
      region2: input.sigungu,
      region3: input.bname,
      extraAddress: input.jibunAddress,
    }));
    console.log(input);
  };

  return (
    <ModalWrapper
      innerModal={
        <ProfileUpdateModalStyle>
          <div className="inner__cont">
            <h3>프로필 수정</h3>
            <div className="imgwrapper">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Ma_Dong-seok.png/250px-Ma_Dong-seok.png"
                alt="유저이미지"
              />
            </div>
            <label className="img__label" htmlFor="user-img__input">
              사진 변경
            </label>
            <input
              style={{ display: 'none' }}
              id="user-img__input"
              type="file"
            />
            <br />
            <label>이름 </label>
            <input type="text" />
            <br />
            <label>닉네임</label>
            <input type="text" />
            <br/>
            <label>이메일</label>
            <input type="text" />
            <br />
            <label>전화번호</label>
            <input type="text" />
            <br />
            <label className="addr__label">주소</label>
            <AddrInputStyle>
              <DaumPostHook
                savingAddressInput={savingAddressInput}
                zonecode={zonecode}
                address={address}
                detailAddress={detailAddress}
              />
              <input type="text"
              />
            </AddrInputStyle>
            <br/>
            <label>비밀번호</label>
            <input type="text" />
            <br/>
            <label>소개</label>
            <input type="text" />
            <br />
            <div className="btn-cont">
              <button onClick={clickCancel} className="btn__style">
                취소
              </button>
              {/* 이파트에 온클릭 들어감 */}
              <button className="btn__style">수정</button>
            </div>
          </div>
        </ProfileUpdateModalStyle>
      }
    />
  );
};

export default ProfileUpdateModal;
