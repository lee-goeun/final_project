import React, { useState } from 'react';

const WriteMatchingPost = () => {
  const [post, setPost] = useState({
    matchTitle: '코코랑놀사람',
    matchContent: '코코는 작아요',
    matchTime: '2022-02-24 12:00',
    matchImgName: '2.png',
    selectPet: '4,5',
  });

  const handleInput = () => {};
  const submitPost = () => {};

  return (
    <>
      <form onSubmit={submitPost}>
        <input
          type="text"
          onChange={handleInput}
          name="matchTitle"
          placeholder="matchTitle"
        />
        <input
          type="text"
          onChange={handleInput}
          name="matchTime"
          placeholder="matchTime"
        />
        <input
          type="text"
          onChange={handleInput}
          name="matchTitle"
          placeholder="matchTitle"
        />
        <input
          type="text"
          onChange={handleInput}
          name="matchContent"
          placeholder="matchContent"
        />
        <h4>이미지 미리보기뷰어 추가</h4>
        {/* <AImageUploaderButton buttonName={'사진 올리기'} />
        <AImageDeleteButton buttonName={'사진 삭제'} /> */}
      </form>
    </>
  );
};

export default WriteMatchingPost;
