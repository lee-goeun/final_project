import React, { useRef } from 'react';
import ReactDaumPost from 'react-daumpost-hook';

const DaumPostHook = ({
  handleInput,
  savingAddressInput,
  address,
  zonecode,
  detailAddress,
}) => {
  const ref = useRef(null);
  const postConfig = {
    onComplete: (data) => {
      savingAddressInput(data);
    },
  };
  const postCode = ReactDaumPost(postConfig);
  return (
    <main>
      <input
        placeholder="우편번호를 입력하세요"
        name="zonecode"
        type="text"
        onClick={postCode}
        value={zonecode}
        onChange={handleInput}
      />
      <input
        name="address"
        placeholder="주소를 입력하세요"
        value={address}
        onChange={handleInput}
      ></input>
      <input
        type="text"
        placeholder="상세주소를 입력하세요."
        name="detailAddress"
        value={detailAddress}
        onChange={handleInput}
      />
    </main>
  );
};
export default DaumPostHook;
