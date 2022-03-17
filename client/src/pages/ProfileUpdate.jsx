import React, { useState, useEffect, useRef } from 'react';
import styles from './Profile.module.css';
import DaumPostHook from '../components/common/DaumPostHook';
import Button from '../components/common/Button';
import UserAvatar from '../components/common/UserAvatar';
import ProfileModalButton from '../components/profile/ProfileModalButton';
import axios from 'axios';

const ProfileUpdate = ({ userInfoProps }) => {
  const [userInfo, setUserInfo] = useState({
    info: '',
    zonecode: '',
    address: '',
    detailAddress: '',
    userPw: '',
    newPassword: '',
    newPasswordConfirmation: '',
    
  });

  const [newPasswordRegCheck, setNewPasswordRegCheck] = useState(false);
  const [newPasswordConfirmationCheck, setNewPasswordConfirmationCheck] =
    useState(false);

  const {
    info,
    zonecode,
    address,
    detailAddress,
    userPw,
    newPassword,
    newPasswordConfirmation,
    balance
  } = userInfo;
  const { userId, userNick, userEmail, userPhone } = userInfoProps;

  useEffect(() => {
    if (!userId) {
      alert('로그인 후 이용해주세요');
    }
    passwordValidationCheck();
  }, [newPassword, newPasswordConfirmation]);

  const passwordValidationCheck = () => {
    const pwRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/;

    if (pwRegex.test(newPassword) === true) {
      setNewPasswordRegCheck(true);
    } else {
      setNewPasswordRegCheck(false);
    }
    if (
      !(newPassword === '' || newPassword === undefined) &&
      newPassword === newPasswordConfirmation
    ) {
      setNewPasswordConfirmationCheck(true);
    } else {
      setNewPasswordConfirmationCheck(false);
    }
  };

  const register = () => {};

  const savingAddressInput = (AddressInput) => {
    setUserInfo((prevProfile) => ({
      ...prevProfile,
      zonecode: AddressInput.zonecode,
      address: AddressInput.address,
      detailAddress: AddressInput.detailAddress,
    }));
  };

  const handleInput = (event) => {
    setUserInfo((prevProfile) => ({
      ...prevProfile,
      [event.target.name]: event.target.value,
    }));
  };

  const clickDeleteBtn = async(e) => {
    await axios.post('http://localhost:3001/find/findId', {
      userId,
    })
    .then((res) => {
      if(res.data.status ==='test'){
        alert('발송에 성공했습니다.');
      }
      else{
        alert('발송에 실패했습니다.')
      }
    })
  };

  return (
    <div className={styles.register}>
      <UserAvatar sx={{ height: '80px', width: '80px' }} />
      <p>{userId || ''}</p>
      <ProfileModalButton buttonName={'프로필 사진 바꾸기'} />
      <h3>프로필</h3>
      <form onSubmit={register}>
        <div className={styles.flex}>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>닉네임변경</li>
            <li className={styles.item}>
              <input
                autoFocus
                type="text"
                name="userNick"
                onChange={handleInput}
                value={userNick || ''}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>잔액</li>
            <li className={styles.item}>
            {/* <div dangerouslySetInnerHTML={ {__html: } }></div> */}
              {/* <text>
              {balance}
              </text> */}
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>소개</li>
            <li className={styles.item}>
              <input
                placeholder="현재 소개가 공백 입니다 소개를 입력하세요."
                type="text"
                onChange={handleInput}
                name="info"
                value={info || ''}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>이메일</li>
            <li className={styles.item}>
              <input
                type="email"
                onChange={handleInput}
                name="userEmail"
                value={userEmail || ''}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>현재 비밀번호</li>
            <li className={styles.item}>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력하세요."
                onChange={handleInput}
                name="password"
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>비밀번호변경</li>
            <li className={styles.item}>
              <input
                type="password"
                placeholder="비밀번호변경을 원할 시 입력하세요."
                name="newPassword"
                autoComplete="new-password"
                onChange={handleInput}
              />
              <p
                style={
                  newPasswordRegCheck ? { color: 'green' } : { color: 'black' }
                }
              >
                {newPasswordRegCheck === true
                  ? '사용가능합니다'
                  : '숫자, 영문(소·대문자), 특수문자를 포함한 8~16자리'}
              </p>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>
              비밀번호변경 확인
            </li>
            <li className={styles.item}>
              <input
                type="password"
                placeholder="비밀번호변경 확인."
                name="newPasswordConfirmation"
                autoComplete="new-password"
                onChange={handleInput}
              />
              <p
                style={
                  newPasswordConfirmationCheck
                    ? { color: 'green' }
                    : { color: 'black' }
                }
              >
                {newPasswordConfirmationCheck === true
                  ? '비밀번호가 일치합니다'
                  : '비밀번호가 일치하지 않습니다.'}
              </p>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>전화번호</li>
            <li className={styles.item}>
              <input
                type="tel"
                placeholder="전화번호를 입력하세요."
                name="phone"
                onChange={handleInput}
                value={userPhone}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>주소</li>
            <li className={styles.item}>
              <DaumPostHook
                handleInput={handleInput}
                savingAddressInput={savingAddressInput}
                zonecode={zonecode}
                address={address}
                detailAddress={detailAddress}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}></li>
            <li className={styles.item}></li>
            <li className={styles.item}>
              <Button name="submitChangeInfo" type="submit">
                정보수정
              </Button>
              
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
