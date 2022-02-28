import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledInput = styled.input`
  padding: 1rem;
  display: none;
`;

const AImageFIleInput = (props) => {
  const inputRef = useRef();
  const changeProfileImg = () => {
    inputRef.current.click();
  };

  //이미지 서버 or 백엔드 이미지 처리 라우터로 사진전송/비동기처리
  const onChange = async (event) => {
    const uploaded = await event.target.files[0];
    //URL 리턴이 올 예정이므로 하단에 URL변경코드 삽입/백엔드 연결시 제거
    if (uploaded) {
      const imageUrl = URL.createObjectURL(uploaded);
      props.previewUrl(imageUrl);
    }
  };

  return (
    <>
      <StyledInput
        type="file"
        name="userImg"
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
      />
      <Button type="button" onClick={changeProfileImg}>
        {props.buttonName}
      </Button>
    </>
  );
};

export default AImageFIleInput;
