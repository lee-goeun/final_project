import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { ChattingUserContainers } from '../components/Chatting/ChattingContainers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

const ChattingPageStyle = styled.div`
  .chat-layout {
    margin: 50px auto;
    width: 1100px;
    /* height: 79vh; */
    height: 1050px;
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
  return (
    <>
      <Header />
      <ChattingPageStyle>
        <div className="chat-layout">
          <div className="cl-left">
            <ChattingUserContainers />
            <ChattingUserContainers />
            <ChattingUserContainers />
          </div>
          <div className="cl-right">
            <div className="cl-icon-box">
              <FontAwesomeIcon icon={faTelegram} className="b-message-icon" />
              <p>친구들과 채팅을 시작해 보세요!</p>
            </div>
          </div>
        </div>
      </ChattingPageStyle>
      <Footer />
    </>
  );
};

export default Chatting;
