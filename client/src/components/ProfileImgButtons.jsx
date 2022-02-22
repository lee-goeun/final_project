import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 1rem;
  display: none;
`;

const ProfileImgButtons = () => {
  const inputRef = useRef();

  const changeProfilePicture = () => {
    inputRef.current.click();
  };
  const onChange = async (event) => {
    const uploaded = await event.target.files[0];
    console.log(uploaded.name);
  };

  return (
    <>
      <StyledInput
        type="file"
        name="userImg"
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
      />
      <button onClick={changeProfilePicture}>사진 변경</button>
      <button>사진삭제</button>
    </>
  );
};

export default ProfileImgButtons;
