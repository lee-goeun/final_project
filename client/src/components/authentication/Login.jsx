import './Authentication.css';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ userInfoHandler }) => {
  const navigate = useNavigate();

  const idRegex = /^[a-z][a-zA-Z0-9]{5,15}$/; // 아이디 정규표현식
  const userPWRegExp = /^(?=.*[a-zA-Z])(?=.*[#?!@$%^&*-])(?=.*[0-9]).{8,16}$/; // 비밀번호 정규표현식

  const errorText = '올바른 형식이 아닙니다.';
  const [isErrorId, setIsErrorId] = useState(false);
  const [isErrorPw, setIsErrorPw] = useState(false);
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

  const [showInput, setShowInput] = useState(false);

  const onChangeIdInput = (e) => {
    setUserId(e.target.value);
    if (idRegex.test(e.target.value) === false) {
      setIsErrorId(true);
    } else {
      setIsErrorId(false);
    }

    if (
      idRegex.test(e.target.value) === true &&
      isErrorPw === false &&
      pwInput.current.value >= 8
    ) {
      loginBtn.current.readOnly = false;
    } else if (idRegex.test(e.target.value) === false) {
      loginBtn.current.readOnly = true;
    }
  };
  const onChangePwInput = (e) => {
    setUserPw(e.target.value);
    if (userPWRegExp.test(e.target.value) === false) {
      setIsErrorPw(true);
    } else {
      setIsErrorPw(false);
    }

    if (isErrorId === false && userPWRegExp.test(e.target.value) === true) {
      loginBtn.current.readOnly = false;
    } else {
      loginBtn.current.readOnly = true;
    }
  };

  const clickLoginBtn = async (e) => {
    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, {
        userId,
        userPw,
      });
      console.log(res);
      if (!res.data.auth) {
        alert('아이디나 비밀번호가 맞지 않습니다.');
      } else {
        userInfoHandler(res);
        localStorage.setItem('token', res.data.accessToken);
        navigate('/');
        alert('로그인 되었습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const idInput = useRef();
  const pwInput = useRef();
  const loginBtn = useRef();

  // 이메일 보낼 때 필요한 값
  // ID 찾기
  const nameInput = useRef('');
  const idEmailInput = useRef('');
  // 비밀번호 찾기
  const userIdInput = useRef('');
  const pwEmailInput = useRef('');
  // 인증번호를 활용한 계정 값 변경
  const userIdReInput =useRef('');
  const pwEmailReInput = useRef('');


  const [showFindIdModal, setShowFindIdModal] = useState(false);

  const clickFindId = (e) => {
    setShowFindIdModal(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    clickLoginBtn();
  };

  // 아이디 찾기 버튼 클릭시 이벤트 처리
  const clickDuplicateCheckBtn1 = async (e) => {
    e.preventDefault();
    console.log(nameInput);
    await axios
      .post('http://localhost:3001/find/findId', {
        userName: nameInput.current.value,
        userEmail: idEmailInput.current.value,
      })
      .then((res) => {
        console.log(res);
        alert('메일로 아이디를 보내드렸습니다.');
      });
  };

  // 비밀번호 찾기 버튼 클릭시 이벤트 처리
  const clickDuplicateCheckBtn2 = async (e) => {
    e.preventDefault();
    console.log(userIdInput);

    await axios
      .post('http://localhost:3001/find/findPw', {
        userId: userIdInput.current.value,
        userEmail: pwEmailInput.current.value,
      })
      .then((res) => {
        console.log(res);
        alert('메일로 인증번호를 보내드렸습니다.');
        setShowInput(true);
      });
  };
  
  // newPw
  // 비밀번호 찾기 변경 이벤트 처리
  const clickDuplicateCheckBtn3 = async (e) => {
    e.preventDefault();
    console.log(userIdReInput);

    await axios
      .put('http://localhost:3001/find/PwRe', {
        userId: userIdReInput.current.value,
        userEmail: pwEmailReInput.current.value,
      })
      .then((res) => {
        console.log(res);
        alert('메일로 인증번호를 보내드렸습니다.');
        setShowInput(true);
      });
  };


  return (
    <>
      <div className="login-container-wrapper">
        <img src={process.env.PUBLIC_URL + 'img/LogoVertical.png'} />
        <div className="login-container">
          <form className="login-form" onSubmit={onSubmit}>
            <div className="lf1">
              <label htmlFor="id-input">
                아이디
                {isErrorId && <span className="error-text">{errorText}</span>}
              </label>
              <input
                ref={idInput}
                id="id-input"
                type="text"
                placeholder="아이디를 입력하세요"
                onChange={onChangeIdInput}
              />
            </div>
            <div className="lf2">
              <label htmlFor="pw-input">
                비밀번호
                {isErrorPw && <span className="error-text">{errorText}</span>}
              </label>
              <input
                ref={pwInput}
                id="pw-input"
                type="password"
                placeholder="비밀번호를 입력하세요"
                // onKeyPress={keyEnter}
                onChange={onChangePwInput}
              />
            </div>
            <div className="lf3">
              {/* <Link to="/"> */}
              <button
                // ref={loginBtn}
                // onClick={clickLoginBtn}
                className="login-btn"
              >
                로그인
              </button>
              {/* </Link> */}
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
            <div style={{ display: 'flex' }}>
              <div className="idbox">
                <p>아이디 찾기</p>
                <div className="find-id">
                  <input
                    type="text"
                    ref={nameInput}
                    placeholder="이름을 입력하세요"
                  />
                  <input
                    type="text"
                    ref={idEmailInput}
                    placeholder="이메일을 입력하세요"
                  />
                  {/* 디자인 수정 필요 */}
                  <button onClick={clickDuplicateCheckBtn1} className="btn__st">
                    아이디 찾기
                  </button>
                </div>
              </div>
              <div className="pwbox">
                <p>비밀번호 찾기</p>
                <div className="find-pw">
                  <input
                    type="text"
                    ref={userIdInput}
                    placeholder="아이디를 입력하세요"
                  />
                  <input
                    type="text"
                    ref={pwEmailInput}
                    placeholder="이메일을 입력하세요"
                  />
                  {showInput ? (
                    <div className="certification-cont">
                      <input
                        className="certification-input"
                        type="text"
                        ref={pwEmailReInput}
                        placeholder="인증번호 8자리"
                      />{' '}
                      <button className="certification-btn">확인</button>
                    </div>
                  ) : null}
                  {/* 디자인 수정 필요 */}
                  <button onClick={clickDuplicateCheckBtn2} className="btn__st">
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            </div>
            <button
              className="off-modal-btn"
              onClick={() => {
                setShowFindIdModal(!showFindIdModal);
                setShowInput(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Login;

// useEffect(() => {
//   idInput.current.focus();

//   if (
//     idInput.current.value === undefined ||
//     pwInput.current.value === undefined
//   ) {
//     loginBtn.current.disabled = true;
//   } else if (
//     idInput.current.value.length >= 6 &&
//     pwInput.current.value.length >= 8
//   ) {
//     loginBtn.current.disabled = false;
//   }
// }, []);
