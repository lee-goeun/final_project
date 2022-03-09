import './Authentication.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ userInfoHandler }) => {
  const navigate = useNavigate();

  const idRegex = /^[a-z][a-zA-Z0-9]{5,15}$/; // 아이디 정규표현식
  const pwRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/; // 비밀번호 정규표현식

  const errorText = '올바른 형식이 아닙니다.';
  const [isErrorId, setIsErrorId] = useState(false);
  const [isErrorPw, setIsErrorPw] = useState(false);
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  const onChangeIdInput = (e) => {
    setUserId(e.target.value);
  };

  const onChangePwInput = (e) => {
    setUserPw(e.target.value);
  };

  // const onChangeIdInput = (e) => {
  //   setUserId(e.target.value);
  //   if (idRegex.test(e.target.value) === false) {
  //     setIsErrorId(true);
  //   } else {
  //     setIsErrorId(false);
  //   }

  //   if (
  //     idRegex.test(e.target.value) === true &&
  //     isErrorPw === false &&
  //     pwInput.current.value >= 8
  //   ) {
  //     loginBtn.current.disabled = false;
  //   } else if (idRegex.test(e.target.value) === false) {
  //     loginBtn.current.disabled = true;
  //   }
  // };
  // const onChangePwInput = (e) => {
  //   setUserPw(e.target.value);
  //   if (pwRegex.test(e.target.value) === false) {
  //     setIsErrorPw(true);
  //   } else {
  //     setIsErrorPw(false);
  //   }

  //   if (isErrorId === false && pwRegex.test(e.target.value) === true) {
  //     loginBtn.current.disabled = false;
  //   } else {
  //     loginBtn.current.disabled = true;
  //   }
  // };

  // 로그인 동작
  // const clickLoginBtn = useCallback(
  //   (e) => {
  //     // e.preventDefault();
  //     axios
  //       .post('http://localhost:3001/auth/login', {
  //         userId,
  //         userPw,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         if (res.status === 200) {
  //           localStorage.setItem('token', res.data.token);

  //           axios
  //             .get('http://localhost:3001/auth/auth', {
  //               params: { token: res.data.token },
  //             })
  //             .then((response) => {
  //               console.log('response', response);
  //               localStorage.setItem('userNick', response.data.userNick);
  //               localStorage.setItem('userId', response.data.userId);
  //               // return {
  //               //   type:"AUTH_USER",
  //               //   payload : response.data
  //               // }
  //             });
  //           alert('로그인 되었습니다.');
  //           navigate('/');
  //         }
  //       })
  //       .catch(() => alert('아이디나 비밀번호가 맞지 않습니다.'));
  //   },
  //   [userId, userPw],
  // );

  const clickLoginBtn = async (e) => {
    try {
      const res = await axios.post('http://localhost:3001/auth/login', {
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

  // const clickLoginBtn = useCallback(
  //   (e) => {
  //     // e.preventDefault();
  //     axios
  //       .post('http://localhost:3001/auth/login', {
  //         userId,
  //         userPw,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         if (res.status === 200) {
  //           localStorage.setItem('token', res.data.token);

  //           axios
  //             .get('http://localhost:3001/auth/auth', {
  //               params: { token: res.data.token },
  //             })
  //             .then((response) => {
  //               console.log('response', response);
  //               localStorage.setItem('userNick', response.data.userNick);
  //               localStorage.setItem('userId', response.data.userId);
  //               // return {
  //               //   type:"AUTH_USER",
  //               //   payload : response.data
  //               // }
  //             });
  //           alert('로그인 되었습니다.');
  //           navigate('/');
  //         }
  //       })
  //       .catch(() => alert('아이디나 비밀번호가 맞지 않습니다.'));
  //   },
  //   [userId, userPw],
  // );

  const idInput = useRef();
  const pwInput = useRef();
  const loginBtn = useRef();

  const [showFindIdModal, setShowFindIdModal] = useState(false);

  const clickFindId = (e) => {
    setShowFindIdModal(true);
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    clickLoginBtn();
  };

  // const keyEnter = (e) => {
  //   if (e.key === 'Enter') {
  //     clickLoginBtn();
  //   }
  // };

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
    </>
  );
};

export default Login;
