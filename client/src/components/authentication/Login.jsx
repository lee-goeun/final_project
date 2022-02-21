import './Authentication.css';
import Footer from '../Footer';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

const Login = () => {
  const clickLoginBtn = (e) => {
    e.preventDefault();
  };

  const idInput = useRef();

  const [showFindIdModal, setShowFindIdModal] = useState(false);

  const clickFindId = (e) => {
    setShowFindIdModal(true);
  };

  useEffect(() => {
    idInput.current.focus();
  }, []);

  return (
    <>
      <Header />
      <div className="login-container-wrapper">
        <img src={process.env.PUBLIC_URL + 'img/LogoVertical.png'} />
        <div className="login-container">
          <form className="login-form">
            <div className="lf1">
              <label htmlFor="id-input">아이디</label>
              <input
                ref={idInput}
                id="id-input"
                type="text"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div className="lf2">
              <label htmlFor="pw-input">비밀번호</label>
              <input
                id="pw-input"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="lf3">
              <button onClick={clickLoginBtn} className="login-btn">
                로그인
              </button>
            </div>
          </form>
        </div>
        <div className="join-find-container">
          <p>계정이 없으신가요?</p>
          <Link to="/join">
            <p className="go-join">회원가입</p>
          </Link>
          <p onClick={clickFindId}>아이디 / 비밀번호를 잊으셨나요?</p>
        </div>
      </div>

      {showFindIdModal ? (
        <div className="find-id-modal-wrapper">
          <div className="find-id-modal-container">
            <div>
              <p>아이디가 기억나지 않습니다.</p>
              <div className="find-id">
                <input type="text" placeholder="이름을 입력하세요" />
                <input type="text" placeholder="휴대폰 번호를 입력하세요" />
                <small>아이디 찾기</small>
                <p>회원님의 아이디는</p>
                <p>OOO 입니다.</p>
              </div>
            </div>
            <div>
              <p>비밀번호가 기억나지 않습니다.</p>
              <div className="find-pw">
                <input type="text" placeholder="아이디를 입력하세요" />
                <input type="text" placeholder="이름을 입력하세요" />
                <small>비밀번호 찾기</small>
                <p>회원님의 비밀번호는</p>
                <p>000 입니다.</p>
              </div>
            </div>
          </div>
          <button
            className="off-modal-btn"
            onClick={() => {
              setShowFindIdModal(!showFindIdModal);
            }}
          >
            확인
          </button>
        </div>
      ) : null}
      <Footer />
    </>
  );
};

export default Login;
