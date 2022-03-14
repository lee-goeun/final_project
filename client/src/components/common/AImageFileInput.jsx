import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { changeInputImage } from '../../redux/modules/matching';

const StyledInput = styled.input`
  padding: 1rem;
  display: none;
`;
const AImageFIleInput = (props) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const changeProfileImg = () => {
    inputRef.current.click();
  };

  const onChange = (event) => {
    const uploaded = event.target.files[0];
    props.appendingFormData(uploaded);
    console.log('uploade', props, uploaded);
    if (uploaded) {
      if (props.post.matchId || props.post.marketId) {
        dispatch(
          changeInputImage({
            form: 'update',
            imgName: uploaded.name,
            imgUrl: URL.createObjectURL(uploaded),
          }),
        );
      } else if(!props.post.matchId && !props.post.marketId){
        dispatch(
          changeInputImage({
            form: 'write',
            imgUrl: URL.createObjectURL(uploaded),
          }),
        );
      }
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
