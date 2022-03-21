import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import '../../pages/MyPageStyle.css';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import AddPetForm from './AddPetForm';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPetList, deleteMyPetPost } from '../../redux/modules/mypet';

const PCStyle = styled.div`
  .pet-container {
    margin: 20px auto;
    width: 600px;
    height: 200px;
    background-color: var(--bgcolor-default);
    box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
    padding: 20px;
    display: grid;
    grid-template-columns: 180px 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      'pet01 pet02'
      'pet01 pet03'
      'pet01 pet04'
      'pet01 pet05';
  }
  .pet01 {
    grid-area: pet01;
  }
  .pet02 {
    grid-area: pet02;
    display: flex;
    justify-content: space-between;
  }
  .pet03 {
    grid-area: pet03;
  }
  .pet04 {
    grid-area: pet04;
  }
  .pet05 {
    grid-area: pet05;
  }
  .pet01 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
  }
  .pet02,
  .pet02,
  .pet03,
  .pet04,
  .pet05 {
    padding-left: 20px;
    padding-top: 8px;
  }
  .pet-img-edit-btn,
  .pet-delete-btn {
    cursor: pointer;
    margin: 0 5px;
    color: var(--font-dark);
    transition: 0.3s;
  }
  .pet-img-edit-btn:hover {
    color: var(--accent-default);
  }
  .pet-delete-btn:hover {
    color: red;
  }
`;

const PetContainer = ({ post, userInfo }) => {
  var nowYear = new Date().getFullYear();
  const dispatch = useDispatch();

  const delMyPet = () => {
    const cnfrm = window.confirm('삭제하시겠습니까?');
    if (cnfrm) {
      dispatch(deleteMyPetPost(post.petId), [dispatch]);
    }
  };

  const res = useSelector((state) => state.mypet.post);
  if (res) {
    if (res.status === 'success') {
      alert('삭제되었습니다.');
      dispatch(getMyPetList(userInfo.userId), [dispatch]);
      res.status = '';
    }
  }

  return (
    <PCStyle>
      <div className="pet-container">
        <div className="pet01">
          <img
            src={
              'http://118.67.142.229:3001/mypage/petDownload?petId=' +
              post.petId +
              '&petImgName=' +
              post.petImgName
            }
            alt="반려동물사진"
          />
        </div>
        <div className="pet02">
          {post.petName}
          <div>
            {/* <FontAwesomeIcon
              icon={faImage}
              className="pet-img-edit-btn"
              title="사진 수정하기"
            /> */}
            <FontAwesomeIcon
              icon={faSquareXmark}
              className="pet-delete-btn"
              onClick={delMyPet}
              title="삭제하기"
            />
          </div>
        </div>
        <div className="pet03">
          {nowYear - post.petBirth.substring(0, 4) + 1}살
        </div>
        <div className="pet04">{post.petSex ? '수컷' : '암컷'}</div>
        <div className="pet05">
          {post.petType} ＞ {post.petTypeDetail}
        </div>
      </div>
    </PCStyle>
  );
};

const MyPet = ({ list, loadingList, userInfo }) => {
  console.log(userInfo);
  const addPetText = useRef();

  const [showAddForm, setShowAddForm] = useState(false);

  const showText = (e) => {
    addPetText.current.style.bottom = '30px';
  };
  const hideText = (e) => {
    addPetText.current.style.bottom = '70px';
  };

  return (
    <>
      <div className="mypet-container">
        {loadingList && 'loading...'}
        {!loadingList && list && (
          <div>
            {list.map((post) => (
              <PetContainer key={post.petId} post={post} userInfo={userInfo} />
            ))}
          </div>
        )}
        <div className="add-container">
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="add-pet-btn"
            title="반려동물 추가하기"
            onMouseEnter={showText}
            onMouseLeave={hideText}
            onClick={() => {
              setShowAddForm(!showAddForm);
            }}
          />
        </div>
        <p className="ppp" ref={addPetText}>
          반려동물 추가하기
        </p>
      </div>
      {showAddForm && (
        <AddPetForm
          userInfo={userInfo}
          clickAddCancel={() => {
            setShowAddForm(false);
          }}
        />
      )}
    </>
  );
};

export default MyPet;
