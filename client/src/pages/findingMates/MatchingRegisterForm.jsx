import React, { useState } from 'react';
import AImageFIleInput from '../../components/common/AImageFileInput';
import AImageViewer from '../../components/common/AImageViewer';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '../../components/common/Button';
import BasicDateTimePicker from '../../components/common/BasicDateTimePicker';
import BasicSelect from '../../components/common/BasicSelect';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5rem 5rem;
`;

const StyledTextFiled = styled(TextField)`
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

const MatchingRegisterForm = () => {
  const [post, setPost] = useState({
    matchTitle: '코코랑놀사람',
    matchContent: '코코는 작아요',
    matchTime: '2022-02-24 12:00',
    matchImgName: '2.png',
    selectPet: '4,5',
  });

  const onChange = (event) => {
    setPost((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  console.log(post);

  const [imageUrl, setImageUrl] = useState('');

  const previewUrl = (image) => {
    setImageUrl(image);
  };

  const deleteUrl = () => {
    URL.revokeObjectURL(imageUrl);
    setImageUrl('');
  };

  const submitPost = () => {};

  return (
    <>
      <FormWrapper onSubmit={submitPost}>
        <StyledTextFiled
          id="outlined-multiline-flexible"
          label="제목"
          onChange={onChange}
          name="matchTitle"
        />
        <StyledTextFiled
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={6}
          onChange={onChange}
          name="matchContent"
        />
        <BottomWrapper>
          <BottomLeftWrapper>
            <BasicDateTimePicker onChange={onChange} />
            <BasicSelect />
            <AImageFIleInput
              buttonName={'이미지 첨부'}
              previewUrl={previewUrl}
            />
            <Button type="button" onClick={deleteUrl}>
              이미지삭제
            </Button>
          </BottomLeftWrapper>
          <AImageViewer image={imageUrl} />
        </BottomWrapper>
      </FormWrapper>
    </>
  );
};

export default MatchingRegisterForm;
