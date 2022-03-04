import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeInputTime } from '../../redux/modules/matching';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const moment = require('moment');

const StyledTextField = styled(TextField)`
  && {
    margin: 0.5rem 0;
  }
`;

const BasicDateTimePicker = () => {
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeInputTime({ form: 'write', time }), [dispatch]);
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <StyledTextField {...props} />}
        label="산책할 시간을 골라주세요"
        value={time}
        onChange={(newValue) => {
          console.log('newValue', newValue);
          setTime(moment(newValue).format('YYYY-MM-DD HH:mm'));
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;
