import React, { useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInputImage } from '../../redux/modules/matching';
import styled from 'styled-components';
import Button from './Button';

const StyledInput = styled.input`
  padding: 1rem;
  display: none;
`;

const AImageFIleInput = (props) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const contents = useSelector((state) => state.matching.write);
  console.log(contents);

  const changeProfileImg = () => {
    inputRef.current.click();
  };

  const onChange = (event) => {
    //상위로 스테이트 끌어올려서 전송누르면 'json'append해서 보내야함//안그럴시 이미지 업로드후 수정 반영x
    const uploaded = event.target.files[0];

    props.formData.append('ImgFile', uploaded);
    props.appendingFormData(props.formData);

    // formData.append('json', JSON.stringify({ contents }));
    // formData.append(
    //   'data',
    //   new Blob([JSON.stringify(contents)], { type: 'application/json' }),
    // );

    //setImt(formData)
    //formData인스턴스 state안에 객체로 삽입 불가능 = dispatch해도 {}
    // dispatch(changeInputImage({ form: 'write', formData }), [dispatch]);

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
