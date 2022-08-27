import React from 'react';
import ReactDaumPost from 'react-daumpost-hook';

const DaumPostHook = ({
  handleInput,
  savingAddressInput,
  address,
  zonecode,
  detailAddress,
}) => {
  const postConfig = {
    onComplete: (data) => {
      savingAddressInput(data);
    },
  };
  const postCode = ReactDaumPost(postConfig);
  return (
    <main>
      <input
        placeholder="도로명 주소로 찾기"
        name="zonecode"
        type="text"
        onClick={postCode}
        value={zonecode}
        onChange={handleInput}
      />
      <input
        name="address"
        placeholder="주소가 입력됩니다."
        value={address}
        onChange={handleInput}
      ></input>
      <input
        type="hidden"
        name="detailAddress"
        value={detailAddress}
        onChange={handleInput}
      />
    </main>
  );
};
export default DaumPostHook;
