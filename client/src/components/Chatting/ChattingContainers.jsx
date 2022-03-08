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

const LeftChatBalloon = ({
  userId,
  message,
  time = '13:00'
}) => {
  return (
    <div className="left-chat-balloon">
      <div className="lcb01">
        <div className="lcb01-imgcon">
          <img
            src="https://www.fnnews.com/resource/media/image/2021/04/20/202104201037265741_l.jpg"
            alt="유저이미지"
          />
        </div>
        <h3>{userId}</h3>
      </div>
      <div className="lcb02">
        <p>{message} </p>
      </div>
      <div className="lcb03">
        <small>{time}</small>
      </div>
    </div>
  );
};

const RightChatBalloon = ({
  userId,
  message,
  time = '13:00'
}) => {
  return (
    <div className="rcb-wrapper">
      <div className="right-chat-balloon">
        <div className="rcb01">
          <p>{message}</p>
          <input type="hidden" value={userId}/>
        </div>
        <div className="rcb02">
          <small>{time}</small>
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
