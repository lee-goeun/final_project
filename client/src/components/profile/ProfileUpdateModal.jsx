import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../common/Modal';
import DaumPostHook from '../common/DaumPostHook';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
const ProfileUpdateModal = ({
  clickCancel,
  nameContent,
  nickContent,
  emailContent,
  phoneContent,
  userPwContent,
  infoContent,
  deatilJusoContent,
}) => {
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
  

  // 유저 정보 호출 시작
  useEffect(() => {
    getAuth();
  });

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
        commentId: data.commentId,
        userNick: data.userNick,
        userName: data.userName,
        region1: data.region1,
        region2: data.region2,
        region3: data.region3,
        userImg: data.userImg,
        //필요한 유저 정보 이곳에다가 추가(백엔드 authController에서도 추가해야함)
      };
    });
  };
  const currentUserId = userInfo.userId;

  //유저 정보 닫기




  // 하드코딩 노가다 시작

  // 이름, 닉네임, 이메일, 전화번호, 상세주소 값, 소개
  const [nameModal, setNameModal] = useState('');
  const [nickModal, setNickModal] = useState('');
  const [emailModal, setEmailModal] = useState('');
  const [phoneModal, setPhoneModal] = useState('');
  const [infoModal, setInfoModal] = useState('');
  const [userPwModal, setUserPwModal] = useState('');
  const [deatilJusoDataModal, setdeatilJusoDataModal] = useState('');


  // 노가다
  // 이름
  useEffect(() => {
    setNameModal(nameContent);
  },[nameContent]);

  // 닉네임
  useEffect(() => {
    setNickModal(nickContent);
  },[nickContent]);

  // 이메일
  useEffect(() => {
    setEmailModal(emailContent);
  },[emailContent]);

  // 전화번호
  useEffect(() => {
    setPhoneModal(phoneContent);
  },[phoneContent]);

  // 비밀번호
  useEffect(() => {
    setUserPwModal(userPwContent);
  },[userPwContent]);

  // 상세 주소
  useEffect(() => {
    setdeatilJusoDataModal(deatilJusoContent);
  },[deatilJusoContent]);

  // 소개
  useEffect(() => {
    setInfoModal(infoContent);
  },[infoContent]);

  // 노가다 끝

  const navigate = useNavigate('');

  const clickUpdate = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:3001/user/userUpdate', {
        userId: currentUserId,
        userName: nameModal,
        userNick: nickModal,
        userEmail: emailModal,
        userPhone: phoneModal,
        zonecode: zonecode,
        address: address,
        detailAddress: deatilJusoDataModal,
        userPw:userPwModal,
        info: infoModal,
      })
      .then((res) => {
        console.log(res);
        alert('회원 정보가 수정 되었습니다. 다시 로그인해주세요')
        localStorage.removeItem('token');
        alert('로그아웃 되었습니다.');
        navigate('/login');
      })
      .catch((err) => {
        console.log('계정 수정 에러 : ', err);
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      });
  };




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
            <label>이름 </label>
            <input type="text"
             onChange={(e) => setNameModal(e.target.value)}
             value={nameModal}
            />
            <br /> 
            <label>닉네임</label>
            <input type="text"
              onChange={(e) => setNickModal(e.target.value)}
              value={nickModal}
            />
            <br/>
            <label>이메일</label>
            <input type="email"
              onChange={(e) => setEmailModal(e.target.value)}
              value={emailModal}
            />
            <br />
            <label>전화번호</label>
            <input type="text"
              onChange={(e) => setPhoneModal(e.target.value)}
              value={phoneModal}
            />
            <br />
            <label className="addr__label">주소</label>
            <AddrInputStyle>
              <DaumPostHook
                savingAddressInput={savingAddressInput}
                zonecode={zonecode}
                address={address}
                detailAddress={detailAddress}
              />
            </AddrInputStyle>
            <br/>
              <input type="text"
              onChange={(e) => setdeatilJusoDataModal(e.target.value)}
              value={deatilJusoDataModal}
              />
            <br/>
            <label>비밀번호</label>
            <input type="password"
              onChange={(e) => setUserPwModal(e.target.value)}
              value={userPwModal}
            />
            <br/>
            <label>소개</label>
            <input type="text"
              onChange={(e) => setInfoModal(e.target.value)}
              value={infoModal}
            />
            <br />
            <div className="btn-cont">
              <button onClick={clickCancel} className="btn__style">
                취소
              </button>
              {/* 이파트에 온클릭 들어감 */}
              <button onClick={clickUpdate} className="btn__style">수정</button>
            </div>
          </div>
        </ProfileUpdateModalStyle>
      }
    />
  );
};

export default ProfileUpdateModal;
