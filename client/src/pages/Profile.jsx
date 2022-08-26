import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.css';
import Button from '../components/common/Button';
import UserAvatar from '../components/common/UserAvatar';
import axios from 'axios';
import ProfileUpdateModal from '../components/profile/ProfileUpdateModal';

import styled from 'styled-components';

const BoxStyle = styled.div`
  #boxboxbox {
    margin: 5px auto 100px auto;
  }
`;

const Profile = ({ userInfoProps }) => {
  console.log('userInfoProps', userInfoProps);
  const {
    userId,
    userName,
    userNick,
    zonecode,
    userEmail,
    userPhone,
    address,
    balance,
    detailAddress,
    info,
  } = userInfoProps;

  console.log(userId);
  const register = () => {};
  const navigate = useNavigate('');

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // 로그인 불가 처리 하면 탈퇴 [완료]
  const clickDeleteBtn = async (e) => {
    e.preventDefault();
    await axios
      .put('http://localhost:3001/user/userDelete', {
        userId: userId,
      })
      .then((res) => {
        console.log(res);
        if (res.data === 'deleted') {
          alert('계정이 삭제되셨습니다.');
          localStorage.removeItem('token');
          alert('로그아웃 되었습니다.');
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log('계정삭제 에러 : ', err);
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      });
  };

  return (
    <BoxStyle>
      <div id="boxboxbox" className={styles.register}>
        <h3>프로필</h3>
        <form onSubmit={register}>
          <div className={styles.flex}>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>개인 프로필</li>
              <li className={styles.item}>
                <UserAvatar sx={{ height: '70px', width: '70px' }} />
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>아이디</li>
              <li className={styles.item}>
                <text>{userId}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>이름</li>
              <li className={styles.item}>
                <text>{userName}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>닉네임</li>
              <li className={styles.item}>
                <text>{userNick}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>잔액</li>
              <li className={styles.item}>
                <text>{balance}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>이메일</li>
              <li className={styles.item}>
                <text>{userEmail}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>전화번호</li>
              <li className={styles.item}>
                <text>{userPhone}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>우편번호</li>
              <li className={styles.item}>
                <text>{zonecode}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>주소</li>
              <li className={styles.item}>
                <text>{address}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>상세주소</li>
              <li className={styles.item}>
                <text>{detailAddress}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}>소개</li>
              <li className={styles.item}>
                <text>{info}</text>
              </li>
              <li className={styles.item}></li>
            </ul>
            <ul className={styles.container}>
              <li className={`${styles.item} ${styles.center}`}></li>
              <li className={styles.item}></li>
              <li className={styles.item}>
                <Button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(true);
                  }}
                >
                  수정하기
                </Button>
                <Button onClick={clickDeleteBtn} name="submitChangeInfo">
                  회원탈퇴
                </Button>
              </li>
            </ul>
          </div>
        </form>
        {showUpdateModal ? (
          <ProfileUpdateModal
            clickCancel={() => {
              setShowUpdateModal(false);
            }}
            userInfoProps={userInfoProps}
          />
        ) : null}
      </div>
    </BoxStyle>
  );
};

export default Profile;
