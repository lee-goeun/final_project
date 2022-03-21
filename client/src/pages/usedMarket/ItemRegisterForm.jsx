import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AImageFIleInput from '../../components/common/AImageFileInput';
import AImageViewer from '../../components/common/AImageViewer';
import Button from '../../components/common/Button';
import {
  changeInput,
  initializeForm,
  unloadPost,
  updateMarketPost,
  writeMarketPost,
} from '../../redux/modules/market';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5rem 5rem;
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 0.5rem;
  }
`;

const BottomLeftWrapper = styled.div`
  margin: 0 0.5rem;
  display: flex;
  flex-direction: column;
`;

const BottomWrapper = styled.div`
  display: flex;
`;

const ItemRegisterForm = () => {
  const [content, setContent] = useState('');
  const contents = useSelector((state) => state.market.write);
  const post = useSelector((state) => state.market.update);
  console.log('content', content, post);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = new FormData();
  // form 초기화 정보 가져오기(글쓰기시에만 write가 사용)
  const { form } = useSelector(({ market }) => ({
    form: market.write,
  }));
  const { marketTitle, marketContent, price, imageUrl } = form;
  console.log('image', imageUrl);
  useEffect(() => {
    if (!post.marketId) dispatch(initializeForm('write'));
    else setContent();
    return () => {
      dispatch(unloadPost());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);

  //write/update후처리
  const res = useSelector((state) => state.market.res);
  if (res) {
    if (res.status === 'success') {
      navigate('/market/list');
      res.status = '';
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (post.marketId) {
      dispatch(
        changeInput({
          form: 'update',
          name,
          value,
        }),
      );
    } else {
      dispatch(
        changeInput({
          form: 'write',
          name,
          value,
        }),
      );
    }
  };

  const deleteUrl = () => {
    if (!post.marketId) URL.revokeObjectURL(imageUrl);
    else URL.revokeObjectURL(post.imageUrl);
  };

  const appendingFormData = (receivedFormData) => {
    setContent(receivedFormData);
  };

  const submitPost = async (e) => {
    e.preventDefault();
    if (!post.marketId) {
      for (const [key, value] of Object.entries(contents)) {
        if (`${key}` === 'marketImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    } else {
      for (const [key, value] of Object.entries(post)) {
        if (`${key}` === 'marketImgName') {
          formData.append(`${key}`, content);
        } else {
          formData.append(`${key}`, `${value}`);
        }
      }
    }

    formData.append('token', localStorage.getItem('token'));
    if (!post.marketId) dispatch(writeMarketPost(formData), [dispatch]);
    else dispatch(updateMarketPost(formData), [dispatch]);
  };

  return (
    <>
      <FormWrapper onSubmit={submitPost} encType="multipart/form-data">
        <StyledTextField
          id="outlined-multiline-flexible"
          label={'제목'}
          onChange={handleChange}
          name="marketTitle"
          value={post.marketTitle || marketTitle}
        />
        <StyledTextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={6}
          onChange={handleChange}
          name="marketContent"
          value={post.marketContent || marketContent}
        />
        <StyledTextField
          id="outlined-multiline-static"
          label="가격"
          rows={6}
          onChange={handleChange}
          name="price"
          value={post.price || price}
        />
        <BottomWrapper>
          <BottomLeftWrapper>
            <AImageFIleInput
              buttonName={'이미지 첨부'}
              appendingFormData={appendingFormData}
              post={post}
              type="market"
            />
            <Button type="button" onClick={deleteUrl}>
              이미지삭제
            </Button>
            <Button type="submit">등록하기</Button>
          </BottomLeftWrapper>
          <AImageViewer post={post} imageUrl={imageUrl} />
        </BottomWrapper>
      </FormWrapper>
    </>
  );
};

export default ItemRegisterForm;
