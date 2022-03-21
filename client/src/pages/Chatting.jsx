import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import {
  ChattingUserContainers,
  LeftChatBalloon,
  RightChatBalloon,
} from '../components/Chatting/ChattingContainers';
import axios from 'axios';
import io from 'socket.io-client';

const ChattingPageStyle = styled.div`
  .chat-layout {
    margin: 100px auto;
    width: 1100px;
    /* height: 60vh; */
    height: 945px;
    display: flex;
    box-shadow: 0 0 1px black;
  }
  .cl-left {
    width: 300px;
    height: 100%;
    background-color: var(--bgcolor-dark);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .cl-right {
    width: 800px;
    height: 100%;
    background-color: var(--bgcolor-dark);
    border-left: 1px solid var(--bordercolor-default);
    text-align: center;
  }
`;

const socket = io.connect('localhost:3002', { transports: ['websocket'] });
socket.emit('msg', { name: '홍길동', message: '테스트' });
const Chatting = ({ userInfo }) => {
  const [chatUserList, setChatUserList] = useState([]);
  const [chatMsgList] = useState([]);
  const [charArr, setCharArr] = useState([]);
  const [whichChatroom, setWhichChatroom] = useState({});
  const [isChatOn, setIsChatOn] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/chat/list/${userInfo.userId}`)
      .then((res) => {
        setChatUserList(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on('receiveMsg', (msg) => {
      console.log('msg', msg);
      setCharArr((chatArr) => chatArr.concat(msg));
    });
  }, []);

  console.log('charArrcharArrcharArrcharArr', charArr);

  const msgClick = (e) => {
    if (e.code === 'Enter') {
      socket.emit('sendMsg', {
        chatroomId: whichChatroom,
        name: userInfo.userNick,
        message: e.target.value,
      });
      e.target.value = '';
    }
  };

  const showMsg = (chat) => {
    setIsChatOn(true);

    // axios.get(`http://localhost:3001/chat/detail/${chat.chatroomId}`).then((res) => {
    //   setChatMsgList(res.data);
    // });

    socket.emit('joinRoom', { roomName: chat.chatroomId });
    setWhichChatroom(chat.chatroomId);
  };
  console.log('user', chatUserList, chatMsgList, whichChatroom);

  return (
    <>
      <Header />
      <ChattingPageStyle>
        <div className="chat-layout">
          <div className="cl-left">
            {chatUserList.map((chat) => (
              <div onClick={() => showMsg(chat)}>
                <ChattingUserContainers
                  userInfo={userInfo}
                  key={chat.userId}
                  userImg={chat.userImg}
                  userNick={chat.userNick}
                  participantNick={chat.participantNick}
                  lastChat={chat.chatting}
                  chatTime={chat.time}
                />
              </div>
            ))}
          </div>
          <div className="cl-right">
            {!isChatOn ? (
              <div className="cl-icon-box">
                <FontAwesomeIcon icon={faTelegram} className="b-message-icon" />
                <p>친구들과 채팅을 시작해 보세요!</p>
                <p>서비스 준비 중입니다.</p>
              </div>
            ) : (
              <div className="chat-room">
                <div className="croom01">
                  {chatMsgList.map((ele) =>
                    userInfo.userNick === ele.name ? (
                      <RightChatBalloon
                        userNick={ele.name}
                        message={ele.message}
                      />
                    ) : (
                      <LeftChatBalloon
                        userNick={ele.name}
                        message={ele.message}
                      />
                    ),
                  )}

                  {charArr.map((ele) =>
                    userInfo.userNick === ele.name ? (
                      <RightChatBalloon
                        userNick={ele.name}
                        message={ele.message}
                      />
                    ) : (
                      <LeftChatBalloon
                        userNick={ele.name}
                        message={ele.message}
                      />
                    ),
                  )}
                </div>
                <div className="croom02">
                  <div>
                    <input
                      onKeyUp={msgClick}
                      type="text"
                      placeholder="메세지를 입력하세요"
                      maxLength="200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ChattingPageStyle>
      <Footer />
    </>
  );
};

export default Chatting;
