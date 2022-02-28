import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { upload } from '../../redux/modules/profileImgHandler';

const StyledInput = styled.input`
  padding: 1rem;
  display: none;
`;

const AImageUploaderButton = (props) => {
  const dispatch = useDispatch();

  console.log(props);
  const inputRef = useRef();
  const [number, setNumber] = useState(1);

  const changeProfileImg = () => {
    inputRef.current.click();
  };
  //이미지 서버 or 백엔드 이미지 처리 라우터로 사진전송/비동기처리
  const uploadImg = async (event) => {
    console.log(event);
    //요청코드 await뒤에 삽입 or 리덕스로 관리
    const uploaded = await event.target.files[0];
    //URL 리턴이 올 예정이므로 하단에 URL변경코드 삽입/백엔드 연결시 제거
    const imageUrl = URL.createObjectURL(uploaded);
    console.log(uploaded);
    console.log(imageUrl);
  };

  return (
    <>
      <StyledInput
        type="file"
        name="userImg"
        accept="image/*"
        ref={inputRef}
        onChange={uploadImg}
      />
      <button type="button" onClick={changeProfileImg}>
        {props.buttonName}
      </button>
      <input
        type="text"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      {/* <button onClick={() => props.onUpload(number)}>number upp</button> */}
      <button onClick={() => dispatch(upload(number))}>number upp</button>
    </>
  );
};

export default AImageUploaderButton;
