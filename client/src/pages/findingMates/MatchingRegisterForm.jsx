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

  const dispatch = useDispatch();

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

  const submitPost = (e) => {
    e.preventDefault();
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
                  label="Age"
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
