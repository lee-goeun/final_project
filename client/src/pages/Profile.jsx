import React, { useState, useEffect, useRef } from 'react';
import styles from './Profile.module.css';
import Button from '../components/common/Button';
import DaumPostHook from '../components/common/DaumPostHook';

const Profile = () => {
  //유저정보 추후 리덕스에서 관리해야할것 같음
  const [profileInfo, setProfileInfo] = useState({
    nickname: '댕댕댕',
    introduce: '강아지를 좋아하고 산책을 주 5회정도 해요 같이산책 하실분~',
    email: 'aaa@gmail.com',
    zonecode: '13494',
    address: '경기 성남시 분당구 판교역로 235',
    detailAddress: '909호',
    phone: '070-1234-5677',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const {
    nickname,
    introduce,
    email,
    phone,
    zonecode,
    address,
    detailAddress,
  } = profileInfo;

  const handleInput = () => {};
  const register = () => {};
  const savingAddressInput = (input) => {
    setProfileInfo((prevProfile) => ({
      ...prevProfile,
      zonecode: input.zonecode,
      address: input.address,
      detailAddress: input.detailAddress,
    }));
  };
  const handleAddressInput = (event) => {
    setProfileInfo((prevProfile) => ({
      ...prevProfile,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={styles.register}>
      <h3>프로필</h3>
      <form onSubmit={register}>
        <div className={styles.flex}>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>닉네임변경</li>
            <li className={styles.item}>
              <input
                autoFocus
                name="name"
                onChange={handleInput}
                value={nickname}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>소개</li>
            <li className={styles.item}>
              <input
                type="textfield"
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
                value={email}
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
                name="passwordConfirm"
                autoComplete="new-password"
                onChange={handleInput}
              />
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
                name="passwordConfirm"
                autoComplete="new-password"
                onChange={handleInput}
              />
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
                value={phone}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>주소</li>
            <li className={styles.item}>
              <DaumPostHook
                handleAddressInput={handleAddressInput}
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
              <Button>정보수정</Button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Profile;
