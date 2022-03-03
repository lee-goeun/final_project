import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AImageFIleInput from '../../components/common/AImageFileInput';
import AImageViewer from '../../components/common/AImageViewer';
import BasicDateTimePicker from '../../components/common/BasicDateTimePicker';
import Button from '../../components/common/Button';
import { changeInput, initializeForm } from '../../redux/modules/matching';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const MatchingRegisterForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const contents = useSelector((state) => state.matching.write);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formData = new FormData();

  // form 초기화 정보 가져오기(update시)
  // const { form } = useSelector(({ matching }) => ({
  //   form: matching.write,
  // }));

  useEffect(() => {
    dispatch(initializeForm('write'));
  }, [dispatch]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeInput({
        form: 'write',
        name,
        value,
      }),
    );
  };

  const previewUrl = (image) => {
    setImageUrl(image);
  };

  const deleteUrl = () => {
    URL.revokeObjectURL(imageUrl);
    setImageUrl('');
  };

  const appendingFormData = (receivedFormData) => {
    setContent(receivedFormData);
    receivedFormData.append('json', JSON.stringify({ contents }));
    //formData객체확인
    // for (var pair of formData.entries()) {
    //   console.log(`key:${pair[0]}, value:${pair[1]}`);
    // }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    formData.append('matchImgName', content);
    formData.append('token', localStorage.getItem('token'));
    //이미지 업후 내용수정시 반영안되는 버그수정필요

    axios({
      method: 'post',
      url: 'http://localhost:3001/match/add',
      data: formData,
    }).then((data) => {
      if (data.status == 200) {
        alert('게시글이 업로드되었습니다.');
        navigate('/match/list');
      }
      console.log('data', data);
    });
  };

  return (
    <>
      <FormWrapper onSubmit={submitPost} encType="multipart/form-data">
        <StyledTextField
          id="outlined-multiline-flexible"
          label="제목"
          onChange={handleChange}
          name="matchTitle"
        />
        <StyledTextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={6}
          onChange={handleChange}
          name="matchContent"
        />
        <BottomWrapper>
          <BottomLeftWrapper>
            <BasicDateTimePicker />
            <Box sx={{ marginBottom: 0.5 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">동물</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="selectPet"
                  name="selectPet"
                  onChange={handleChange}
                  value={useSelector((state) => state.matching.write.selectPet)}
                >
                  <MenuItem value={'1'}>강아지</MenuItem>
                  <MenuItem value={'2'}>고양이</MenuItem>
                  <MenuItem value={'3'}>기타</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <AImageFIleInput
              buttonName={'이미지 첨부'}
              previewUrl={previewUrl}
              appendingFormData={appendingFormData}
            />
            <Button type="button" onClick={deleteUrl}>
              이미지삭제
            </Button>
            <Button type="submit">산책메이트 글올리기</Button>
          </BottomLeftWrapper>
          <AImageViewer image={imageUrl} />
        </BottomWrapper>
      </FormWrapper>
    </>
  );
};

export default MatchingRegisterForm;
