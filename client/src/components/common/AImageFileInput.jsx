import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { changeInputImageMatching } from '../../redux/modules/matching';
import { changeInputImageMarket } from '../../redux/modules/market';

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
    if (uploaded) {
      if(props.type ==='matching'){
        if (props.post.matchId) {
          dispatch(
            changeInputImageMatching({
              form: 'update',
              imgName: uploaded.name,
              imgUrl: URL.createObjectURL(uploaded),
            }),
          );
        } else{
          dispatch(
            changeInputImageMatching({
              form: 'write',
              imgUrl: URL.createObjectURL(uploaded),
            }),
          );
        }
      }else{
        if (props.post.marketId) {
          dispatch(
            changeInputImageMarket({
              form: 'update',
              imgName: uploaded.name,
              imgUrl: URL.createObjectURL(uploaded),
            }),
          );
        } else{
          dispatch(
            changeInputImageMarket({
              form: 'write',
              imgUrl: URL.createObjectURL(uploaded),
            }),
          );
        }
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
