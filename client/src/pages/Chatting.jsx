import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import {
  ChattingRoom,
  ChattingUserContainers,
  LeftChatBalloon,
  RightChatBalloon
} from '../components/Chatting/ChattingContainers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import socketio from "socket.io-client";


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
const socket = socketio('localhost:3002');
console.log('socket', socket)
const Chatting = ({userInfo}) => {
  const [chatUserList, setChatUserList] = useState([]);
  
  console.log(chatUserList);
  
  const showMsg = (matchId) => {
  }
  const clickTest = (e) =>{
    e.preventDefault();
    socket.emit('send message', {name : '홍길동',message:'테스트'});
  }
  const msgClick = (e) => {
  }
  useEffect(() => {
    axios.get('http://localhost:3001/chat/list').then((res) => {
      setChatUserList(res.data);
    });
  }, []);
  console.log('user', chatUserList);
  // const chatUserList = [
  //   {
  //     id: '2477',
  //     userImg:
  //       'https://img.smlounge.co.kr/upload/woman/article/201906/thumb/42093-370390-sampleM.jpg',
  //     userNick: '마동석',
  //     chatting: '사진 잘봤습니다! 맞팔하고시펑요~',
  //     time: '1시간전',
  //   },
  //   {
  //     id: '2222',
  //     userImg:
  //       'https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg',
  //     userNick: '아이유',
  //     chatting: '산책메이트 아직 찾고 계시나요?',
  //     time: '1일전',
  //   },
  //   {
  //     id: '177',
  //     userImg:
  //       'https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20211021110626_f6de28501aed1ac97c517654f25aa432.jpg',
  //     userNick: '한소희',
  //     chatting: '안녕하세요~~',
  //     time: '7일전',
  //   },
  // ];

  return (
    <>
      <Header />
      <ChattingPageStyle>
        <div className="chat-layout">
          <div className="cl-left">
            {chatUserList.map((chat) => (
              <div onClick={showMsg(chat.matchId)}>
                <ChattingUserContainers
                  key={chat.userId}
                  userImg={chat.userImg}
                  userNick={chat.userId}
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
                {/* { 
                   userInfo.userId == chat.userId ? 
                   <LeftChatBalloon  userId={chat.userId} message={chat.message}/> : 
                   <RightChatBalloon userId={chat.userId} message={chat.message}/>
                 } */}
              </div>
              <div className="croom02">
                <form>
                  <input
                    onKeyUp={msgClick}
                    type="text"
                    placeholder="메세지를 입력하세요"
                    maxLength="200"
                  />
                </form>
                <button onClick={clickTest}>클릭테스트</button>
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
