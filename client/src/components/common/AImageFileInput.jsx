import React, { useRef } from 'react';
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

  const onChange = (event) => {
    const uploaded = event.target.files[0];
    props.appendingFormData(uploaded);
    if (uploaded) {
      const imageUrl = URL.createObjectURL(uploaded);
      props.previewUrl(imageUrl);
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
