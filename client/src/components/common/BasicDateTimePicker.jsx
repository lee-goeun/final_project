import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  && {
    margin: 0.5rem 0;
  }
`;

const BasicDateTimePicker = ({ onChange }) => {
  const [value, setValue] = useState(new Date());
  console.log((value + 60000).toISOString());
  console.log(value.toISOString().substring(0, 10));
  console.log(value.toISOString().substring(11, 19));
  console.log(
    `${value.toISOString().substring(0, 10)} ${
      value.toISOString().substring(11, 13) + 9
    }${value.toISOString().substring(13, 19)}`,
  );

  // console.log(value.toLocaleTimeString());
  // // console.log((value - new Date().getTimezoneOffset() * 60000).toISOString());
  // console.log(value.toISOString());
  // console.log(
  //   new Date(
  //     (value.getTime() - value.getTimezoneOffset() * 60000).toISOString(),
  //   ),
  // );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <StyledTextField {...props} />}
        label="산책할 시간을 골라주세요"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;
