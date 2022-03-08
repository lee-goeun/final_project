import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledInput = styled.input`
  padding: 1rem;
  display: none;
`;
const AImageFIleInput = (props) => {
  if (props.post.matchId) {
    console.log(props.post, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    props.post.imageUrl = `http://localhost:3001/match/download?matchId=${props.post.matchId}&matchImgName=${props.post.matchImgName}`;
  }

  const inputRef = useRef();

  const changeProfileImg = () => {
    inputRef.current.click();
  };

  const onChange = (event) => {
    const uploaded = event.target.files[0];
    props.appendingFormData(uploaded);
    if (uploaded) {
      props.imageUrl = URL.createObjectURL(uploaded);
    }
  };

  return (
    <>
      <StyledInput
        type="file"
        name="aImgFile"
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
