import React, { useRef, useState } from 'react';
import './MyPageStyle.css';
import PetContainer from '../components/mypage/PetContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import AddPetForm from '../components/mypage/AddPetForm';

const MyPet = () => {
  const addPetText = useRef();

  const [showAddForm, setShowAddForm] = useState(false);

  const showText = (e) => {
    addPetText.current.style.bottom = '30px';
  };
  const hideText = () => {
    addPetText.current.style.bottom = '70px';
  };

  return (
    <>
      <div className="mypet-container">
        <PetContainer />
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
          clickAddCancel={() => {
            setShowAddForm(!showAddForm);
          }}
        />
      )}
    </>
  );
};

export default MyPet;
