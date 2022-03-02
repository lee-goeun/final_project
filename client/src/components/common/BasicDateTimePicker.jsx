import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeInputTime } from '../../redux/modules/matching';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

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
          setTime(
            `${newValue.toISOString().substring(0, 10)} ${newValue
              .toISOString()
              .substring(11, 13)}${newValue.toISOString().substring(13, 19)}`,
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;

//ISOSstring(UTC:0) 한국시간(UTC:+9)안맞음 추후 시간여유있을 시 작업
//local 타임으로 찍을 시 Tue Mar 01 2022 14:38:50 GMT+0900 (한국 표준시) !== db형식
//
// console.log(value.toLocaleTimeString());
// // console.log((value - new Date().getTimezoneOffset() * 60000).toISOString());
// console.log(value.toISOString());
// console.log(
//   new Date(
//     (value.getTime() - value.getTimezoneOffset() * 60000).toISOString(),
//   ),
// );
