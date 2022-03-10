import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const FormStyle = styled.div`
  .add-pet-form-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  .add-pet-form-container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    background-color: white;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
    padding: 40px;
    text-align: center;
    z-index: 3;
  }
  .pet-form-label {
    display: block;
    text-align: left;
    padding-left: 10px;
    margin: 0 auto;
    width: 450px;
  }
  .pet-img-label {
    display: block;
    background-color: white;
    position: relative;
    z-index: 2;
    margin-bottom: 30px;
  }
  .pet-img-btn {
    font-size: 50px;
    cursor: pointer;
    color: var(--font-dark);
    transition: 0.3s;
  }
  .pet-img-btn:hover {
    color: var(--accent-default);
  }
  #pet-img {
    display: none;
  }
  #pet-name,
  #pet-species,
  #pet-species-direct-input,
  #pet-species-name,
  #pet-birth {
    display: block;
    width: 450px;
    height: 30px;
    padding: 0 10px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .pet-male,
  .pet-female {
  }
  .pet-sex-label {
    display: inline-block;
    margin-left: 5px;
    margin-right: 20px;
  }
  .btns-container {
    margin-top: 30px;
  }
  .imgppp {
    position: relative;
    z-index: 1;
    bottom: 60px;
    transition: 0.3s;
  }
`;

const AddPetForm = ({ clickAddCancel }) => {
  const [selectOther, setSelectOther] = useState(false);

  const imgText = useRef();

  const showImgText = () => {
    imgText.current.style.bottom = '30px';
  };
  const hideImgText = () => {
    imgText.current.style.bottom = '60px';
  };

  const selectSpecies = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'other') {
      setSelectOther(true);
    } else if (e.target.value !== 'other') {
      setSelectOther(false);
    }
  };

  return (
    <FormStyle>
      <div className="add-pet-form-wrapper">
        <div className="add-pet-form-container">
          <label htmlFor="pet-img" className="pet-img-label">
            <FontAwesomeIcon
              icon={faImage}
              className="pet-img-btn"
              title="반려동물 사진 올리기"
              onMouseEnter={showImgText}
              onMouseLeave={hideImgText}
            />
          </label>
          <p className="imgppp" ref={imgText}>
            반려동물 사진
          </p>
          <input id="pet-img" type="file" />
          <label className="pet-form-label" htmlFor="pet-name">
            반려동물 이름
          </label>
          <input
            id="pet-name"
            type="text"
            placeholder="반려동물의 이름을 입력하세요"
          />
          <label className="pet-form-label" htmlFor="pet-species">
            반려동물 종류
          </label>
          <select id="pet-species" onChange={selectSpecies}>
            <option value="none">종류를 선택하세요</option>
            <option value="dog">강아지</option>
            <option value="cat">고양이</option>
            <option value="reptile">파충류</option>
            <option value="fish">물고기</option>
            <option value="hamster">햄스터</option>
            <option value="bird">새</option>
            <option value="other">기타 (직접입력)</option>
          </select>
          {selectOther ? (
            <input
              type="text"
              id="pet-species-direct-input"
              placeholder="반려동물의 종류를 입력해주세요"
            />
          ) : null}
          <label className="pet-form-label" htmlFor="pet-species-name">
            종 이름
          </label>
          <input
            type="text"
            id="pet-species-name"
            placeholder="반려동물의 세부 종(품종)을 입력하세요 "
          />
          <label className="pet-form-label" htmlFor="pet-birth">
            생년월일
          </label>
          <input id="pet-birth" type="date" />
          <label className="pet-form-label">반려동물 성별</label>
          <input type="radio" name="petSex" id="pet-male" value="male" />
          <label className="pet-sex-label" htmlFor="pet-male">
            수컷
          </label>
          <input type="radio" name="petSex" id="pet-female" value="female" />
          <label className="pet-sex-label" htmlFor="pet-female">
            암컷
          </label>
          <div className="btns-container">
            <button className="btn__style" onClick={clickAddCancel}>
              취소
            </button>
            <button className="btn__style">등록</button>
          </div>
        </div>
      </div>
    </FormStyle>
  );
};

export default AddPetForm;
