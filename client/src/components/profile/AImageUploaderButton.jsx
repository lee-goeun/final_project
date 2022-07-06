import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { upload } from '../../redux/modules/profileImgHandler';
import AProfileFileInput from './AProfileFileInput';

const AImageUploaderButton = () => {
  const dispatch = useDispatch();
  //이미지 서버 or 백엔드 이미지 처리 라우터로 사
  // 진전송 / 비동기처리;
  // const uploadImg = async (event) => {
  //   console.log(event);
  //   //요청코드 await뒤에 삽입 or 리덕스로 관리
  //   const uploaded = await event.target.files[0];
  //   //URL 리턴이 올 예정이므로 하단에 URL변경코드 삽입/백엔드 연결시 제거
  //   const imageUrl = URL.createObjectURL(uploaded);
  //   console.log(uploaded);
  //   console.log(imageUrl);
  // };

  const savingUrl = useCallback(
    (imageUrl) => dispatch(upload(imageUrl)),
    [dispatch],
  );

  return (
    <>
      <AProfileFileInput buttonName={'사진 변경'} savingUrl={savingUrl} />
      {/* <input
        type="text"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      /> */}
      {/* <button onClick={() => props.onUpload(number)}>number upp</button> */}
      {/* <button onClick={() => dispatch(upload(imageUrl))}>number upp</button> */}
    </>
  );
};

export default AImageUploaderButton;
