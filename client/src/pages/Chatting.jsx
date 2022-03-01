import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import {
  ChattingRoom,
  ChattingUserContainers,
} from '../components/Chatting/ChattingContainers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

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

const Chatting = () => {
  const chatUserList = [
    {
      id: '2477',
      userImg:
        'https://img.smlounge.co.kr/upload/woman/article/201906/thumb/42093-370390-sampleM.jpg',
      userNick: '마동석',
      chatting: '사진 잘봤습니다! 맞팔하고시펑요~',
      time: '1시간전',
    },
    {
      id: '2222',
      userImg:
        'https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg',
      userNick: '아이유',
      chatting: '산책메이트 아직 찾고 계시나요?',
      time: '1일전',
    },
    {
      id: '177',
      userImg:
        'https://entertainimg.kbsmedia.co.kr/cms/uploads/PERSON_20211021110626_f6de28501aed1ac97c517654f25aa432.jpg',
      userNick: '한소희',
      chatting: '안녕하세요~~',
      time: '7일전',
    },
  ];

  return (
    <>
      <Header />
      <ChattingPageStyle>
        <div className="chat-layout">
          <div className="cl-left">
            {chatUserList.map((chat) => (
              <ChattingUserContainers
                key={chat.id}
                userImg={chat.userImg}
                userNick={chat.userNick}
                lastChat={chat.chatting}
                chatTime={chat.time}
              />
            ))}
          </div>
          <div className="cl-right">
            <div className="cl-icon-box">
              <FontAwesomeIcon icon={faTelegram} className="b-message-icon" />
              <p>친구들과 채팅을 시작해 보세요!</p>
            </div>
            {/* <ChattingRoom /> */}
          </div>
        </div>
      </ChattingPageStyle>
      <Footer />
    </>
  );
};

export default Chatting;
