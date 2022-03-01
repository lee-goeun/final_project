import React, { useRef, useState, useCallback } from 'react';
import { useSelect, useDispatch } from 'react-redux';
import { changeInputImage } from '../../redux/modules/matching';
import styled from 'styled-components';
import Button from './Button';

const StyledInput = styled.input`
  padding: 1rem;
  display: none;
`;

const AImageFIleInput = (props) => {
  // const [img, setImg] = useState({});

  const dispatch = useDispatch();
  const inputRef = useRef();

  const changeProfileImg = () => {
    inputRef.current.click();
  };

  const onChange = async (event) => {
    const uploaded = event.target.files[0];
    const formData = new FormData();
    formData.append('matchImgName', uploaded);
    //setImt(formData)
    //formData인스턴스 state안에 객체로 삽입 불가능 = dispatch해도 {}
    dispatch(changeInputImage({ form: 'write', formData }), [dispatch]);

    if (uploaded) {
      const imageUrl = URL.createObjectURL(uploaded);
      props.previewUrl(imageUrl);
    }
  };

  // const onChange = async (event) => {
  //   const uploaded = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('matchImgName', uploaded);
  //   formData.append('matchTitle');
  //   formData.append('matchContent');
  //   formData.append('matchTime');
  //   formData.append('selectPet');
  //   const res = await setImg(formData);
  //   console.log(res, 'formData state');
  //   dispatch(changeInputImage({ form: 'write', formData }), [dispatch]);
  //   if (uploaded) {
  //     const imageUrl = URL.createObjectURL(uploaded);
  //     props.previewUrl(imageUrl);
  //   }
  // };

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
