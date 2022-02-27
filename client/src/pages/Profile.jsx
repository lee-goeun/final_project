import React, { useState, useEffect, useRef } from 'react';
import styles from './Profile.module.css';
import DaumPostHook from '../components/common/DaumPostHook';
import Button from '../components/common/Button';
import UserAvatar from '../components/common/UserAvatar';
import ProfileModalButton from '../components/profile/ProfileModalButton';

const Profile = () => {
  //유저정보 추후 리덕스에서 관리해야할것 같음
  const [userInfo, setUserInfo] = useState({
    user_id: 'asmr5586',
    user_nick: '댕댕댕',
    introduce: '강아지를 좋아하고 산책을 주 5회정도 해요 같이산책 하실분~',
    user_email: 'aaa@gmail.com',
    zonecode: '13494',
    address: '경기 성남시 분당구 판교역로 235',
    detailAddress: '909호',
    user_phone: '070-1234-5677',
    password: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  const [newPasswordRegCheck, setNewPasswordRegCheck] = useState(false);
  const [newPasswordConfirmationCheck, setNewPasswordConfirmationCheck] =
    useState(false);

  const {
    user_id,
    user_nick,
    introduce,
    user_email,
    user_phone,
    zonecode,
    address,
    detailAddress,
    password,
    newPassword,
    newPasswordConfirmation,
  } = userInfo;

  useEffect(() => {
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

  return (
    <div className={styles.register}>
      {/* <ProfileImgHandler sx={{ height: '80px', width: '80px' }} /> */}
      {/* <UserAvatar sx={{ height: '80px', width: '80px' }} /> */}
      <UserAvatar sx={{ height: '80px', width: '80px' }} />
      <p>{user_id}</p>
      <ProfileModalButton />
      <h3>프로필</h3>
      <form onSubmit={register}>
        <div className={styles.flex}>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>닉네임변경</li>
            <li className={styles.item}>
              <input
                autoFocus
                name="nickname"
                onChange={handleInput}
                value={user_nick}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>소개</li>
            <li className={styles.item}>
              <input
                type="text"
                onChange={handleInput}
                name="introduce"
                value={introduce}
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
                name="email"
                value={user_email}
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
                value={user_phone}
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

export default Profile;
