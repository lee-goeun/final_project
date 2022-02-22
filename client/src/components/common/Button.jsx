import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 90px;
  border-radius: 5px;
  border: solid 1px #e9ecef;
  box-sizing: border-box;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  text-align: center;
  padding: 7px;
  height: 38px;
  margin: 0px 5px;
  background-color: #ffffff;
  color: #333333;

  &:hover {
    background-color: #ec9a71;
    color: #ffffff;
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
