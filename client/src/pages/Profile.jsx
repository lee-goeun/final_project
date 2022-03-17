import React, { useState, useEffect, useRef } from 'react';
import styles from './Profile.module.css';
import Button from '../components/common/Button';
import UserAvatar from '../components/common/UserAvatar';
import ProfileModalButton from '../components/profile/ProfileModalButton';
import axios from 'axios';

const Profile = ({ userInfoProps }) => {
  const [userInfo, setUserInfo] = useState({
  });

  const [newPasswordRegCheck, setNewPasswordRegCheck] = useState(false);
  const [newPasswordConfirmationCheck, setNewPasswordConfirmationCheck] =
    useState(false);

  const {
    newPassword,
    newPasswordConfirmation,
  } = userInfo;
  const { userId, userNick, zonecode, userEmail, userPhone, address, balance, detailAddress, info } = userInfoProps;

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
            <li className={`${styles.item} ${styles.center}`}>닉네임</li>
            <li className={styles.item}>
              <text>
                {userNick}
              </text>
              </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>잔액</li>
            <li className={styles.item}>
              <text>
              {balance}
              </text>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>이메일</li>
            <li className={styles.item}>
              <text>
                {userEmail}
              </text>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>전화번호</li>
            <li className={styles.item}>
              <text>
                {userPhone}
              </text>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>우편번호</li>
            <li className={styles.item}>
              <text>
                {zonecode}
              </text>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>주소</li>
            <li className={styles.item}>
              <text>
                {address}
              </text>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>상세주소</li>
            <li className={styles.item}>
              <text>
                {detailAddress}
              </text>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>소개</li>
            <li className={styles.item}>
              <text>
                {info}
              </text>
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
      {/* 디자인 변경 필요 */}
      <delButton type="clickDeleteBtn" name="submitChangeInfo">회원탈퇴</delButton>
    </div>
  );
};

export default Profile;
