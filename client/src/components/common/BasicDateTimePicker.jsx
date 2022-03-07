import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInputTime } from '../../redux/modules/matching';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment';

const StyledTextField = styled(TextField)`
  && {
    margin: 0.5rem 0;
  }
`;

const BasicDateTimePicker = ({ post, matchTime }) => {
  //기존포스트가 있는 경우:post전달 기존 포스트가 없는 경우:matchTime만 전달
  const dispatch = useDispatch();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <StyledTextField {...props} />}
        label="산책할 시간을 골라주세요"
        value={(post.matchId && post.matchTime) || matchTime}
        onChange={(newValue) => {
          if (post.matchId) {
            dispatch(
              changeInputTime({
                form: 'update',
                // time: moment(newValue).format('YYYY-MM-DD HH:mm'),
                time: newValue,
              }),
              [dispatch],
            );
          } else {
            dispatch(
              changeInputTime({
                form: 'write',
                time: moment(newValue).format('YYYY-MM-DD HH:mm'),
              }),
              [dispatch],
            );
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;
