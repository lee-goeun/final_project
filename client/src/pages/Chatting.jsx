import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  ChattingRoom,
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

const socket = io.connect('localhost:3002', { transports: ['websocket'] } );
socket.emit('msg', { name: '홍길동', message: '테스트' });
const Chatting = ({ userInfo }) => {

  const [chatUserList, setChatUserList] = useState([]);
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/chat/list/${userInfo.userId}`).then((res) => {
      setChatUserList(res.data);
    });
  }, []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  },[]);

  useEffect(() => {
    socket.on("receive msg", (msg) => {
      setCharArr((chatArr) => chatArr.concat(msg));
    }); 
  }, []);
  console.log('charArrcharArrcharArrcharArr',charArr); 
  const msgClick = (e) => {
    if (e.code == 'Enter') {
      socket.emit('send msg', { name: userInfo.userNick , message: e.target.value });
      e.target.value = '';
    }
  };

  const showMsg = (chatrommId) => {
    
  };

  
  
  console.log('user', chatUserList);

  return (
    <>
      <Header />
      <ChattingPageStyle>
        <div className="chat-layout">
          <div className="cl-left">
            {chatUserList.map((chat) => (
              <div onClick={showMsg(chat.chatroomId)}>
                <ChattingUserContainers
                  userInfo = {userInfo}
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
            {/* <div className="cl-icon-box">
              <FontAwesomeIcon icon={faTelegram} className="b-message-icon" />
              <p>친구들과 채팅을 시작해 보세요!</p>
              
            </div> */}
            <div className="chat-room">
              <div className="croom01">
                 {charArr.map((ele) => (
                   userInfo.userNick == ele.name ? 
                   <RightChatBalloon userNick={ele.name} message={ele.message}/> : 
                   <LeftChatBalloon  userNick={ele.name} message={ele.message}/>
                   
                 ))}
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
          </div>
        </div>
      </ChattingPageStyle>
      <Footer />
    </>
  );
};

export default Chatting;
