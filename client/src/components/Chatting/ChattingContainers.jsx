import { useState } from 'react';
import './ChattingContainers.css';

const ChattingUserContainers = () => {
  const [showThisChat, setShowThisChat] = useState(false);

  return (
    <div
      className="chat-user-list-container"
      onClick={() => {
        setShowThisChat(!showThisChat);
      }}
    >
      <div className="culc01">
        <div className="culc01-img-container">
          <img
            src="http://monthly.chosun.com/up_fd/Mdaily/2019-05/bimg_thumb/%EB%A7%88%EB%8F%99%EC%84%9D.jpg"
            alt="유저이미지"
          />
        </div>
      </div>
      <div className="culc02">
        <h3>상대방닉네임</h3>
      </div>
      <div className="culc03">
        <p>
          마지막 채팅 내용<small>1시간전</small>
        </p>
      </div>
    </div>
  );
};

const ChattingRoom = () => {
  return (
    <>
      <div>채팅방</div>
    </>
  );
};

export { ChattingUserContainers, ChattingRoom };
