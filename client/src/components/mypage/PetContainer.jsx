import { faImage, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const PCStyle = styled.div`
  .pet-container {
    margin: 10px auto;
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

const PetContainer = () => {
  return (
    <PCStyle>
      <div className="pet-container">
        <div className="pet01">
          <img
            src="https://www.ui4u.go.kr/depart/img/content/sub03/img_con03030100_01.jpg"
            alt="반려동물사진"
          />
        </div>
        <div className="pet02">
          코코
          <div>
            <FontAwesomeIcon
              icon={faImage}
              className="pet-img-edit-btn"
              title="사진 수정하기"
            />
            <FontAwesomeIcon
              icon={faSquareXmark}
              className="pet-delete-btn"
              title="삭제하기"
            />
          </div>
        </div>
        <div className="pet03">3살</div>
        <div className="pet04">암컷</div>
        <div className="pet05">강아지 ＞ 푸들</div>
      </div>
    </PCStyle>
  );
};

export default PetContainer;
