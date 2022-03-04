import { useState } from 'react';
import './ChattingContainers.css';

const ChattingUserContainers = ({
  userImg,
  userNick,
  lastChat,
  chatTime = '0시간전',
}) => {
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
          <img src={userImg} alt="유저이미지" />
        </div>
      </div>
      <div className="culc02">
        <h3>{userNick}</h3>
      </div>
      <div className="culc03">
        <div className="culc03-left">{lastChat}</div>
        <div className="culc03-right">
          <small>{chatTime}</small>
        </div>
      </div>
    </div>
  );
};

const ChattingRoom = () => {
  return (
    <>
      <div className="chat-room">
        <div className="croom01"></div>
        <div className="croom02">
          <form>
            <input
              type="text"
              placeholder="메세지를 입력하세요"
              maxLength="100"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export { ChattingUserContainers, ChattingRoom };
