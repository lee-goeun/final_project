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
        <div className="croom01">
          <LeftChatBalloon />
          <RightChatBalloon />
          <RightChatBalloon />
          <LeftChatBalloon />
          <RightChatBalloon />
        </div>
        <div className="croom02">
          <form>
            <input
              type="text"
              placeholder="메세지를 입력하세요"
              maxLength="200"
            />
          </form>
        </div>
      </div>
    </>
  );
};

const LeftChatBalloon = () => {
  return (
    <div className="left-chat-balloon">
      <div className="lcb01">
        <div className="lcb01-imgcon">
          <img
            src="https://www.fnnews.com/resource/media/image/2021/04/20/202104201037265741_l.jpg"
            alt="유저이미지"
          />
        </div>
        <h3>아이디</h3>
      </div>
      <div className="lcb02">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          안녕하세요 반갑습니다 친해게 지내요!
        </p>
      </div>
      <div className="lcb03">
        <small>16:32</small>
      </div>
    </div>
  );
};

const RightChatBalloon = () => {
  return (
    <div className="rcb-wrapper">
      <div className="right-chat-balloon">
        <div className="rcb01">
          <p>반가워요 소통</p>
        </div>
        <div className="rcb02">
          <small>16:35</small>
        </div>
      </div>
    </div>
  );
};

export {
  ChattingUserContainers,
  ChattingRoom,
  LeftChatBalloon,
  RightChatBalloon,
};
