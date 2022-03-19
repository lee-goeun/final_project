import { useEffect, useRef, useState } from 'react';
import './Authentication.css';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import DaumPostHook from '../common/DaumPostHook';
import styled from 'styled-components';
import axios from 'axios';

const DaumPostStyle = styled.div`
  margin: 0 auto 10px auto;
  width: 400px;
  height: fit-content;
  font-size: 100px;
  input {
    display: block;
    border: 1px solid var(--bordercolor-default);
    width: 100%;
    height: 40px;
    padding: 0 10px;
    margin: 2px 0;
    transition: 0.3s;
  }
  input:focus {
    border: 1px solid var(--accent-default);
  }
`;

const Join = () => {
  const navigate = useNavigate();

  const idInput = useRef('');
  const nickInput = useRef('');
  const emailInput = useRef('');

  const [userInfo, setUserInfo] = useState({
    address: '',
    zonecode: '',
    detailAddress: '',
    region1: '',
    region2: '',
    region3: '',
    extraAddress: '',
    buildingName: '',
  });

  const savingAddressInput = (input) => {
    setUserInfo(() => ({
      zonecode: input.zonecode,
      address: input.address + ` ${input.buildingName}`,
      detailAddress: input.detailAddress,
      region1: input.sido,
      region2: input.sigungu,
      region3: input.bname,
      extraAddress: input.jibunAddress,
    }));
    console.log(input);
  };

  const { zonecode, address, detailAddress } = userInfo;

  // 아이디, 비밀번호, 비밀번호 재입력 input의 value값 저장
  const [inputId, setInputId] = useState();
  const [inputPw, setInputPw] = useState();
  const [reInputPw, setReInputPw] = useState();
  const [inputName, setInputName] = useState();
  const [inputNick, setInputNick] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputPhone, setInputPhone] = useState();
  const [inputAge, setInputAge] = useState();
  const [inputSex, setInputSex] = useState();

  const idRegex = /^[a-z][a-zA-Z0-9]{5,15}$/; // 아이디 정규표현식
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[#?!@$%^&*-])(?=.*[0-9]).{8,16}$/; // 비밀번호 정규표현식
  const nickRegex = /[가-힣a-zA-Z0-9].{2,12}$/;
  const emailRegex =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{2,3}$/;

  // 아이디, 비밀번호, 비밀번호 재입력 별 유효성 검사 에러문
  const [idRegErrorText, setIdRegErrorText] = useState(
    '영문자(소문자) 또는 영문자(소문자)+숫자로 시작하는 6~16자리',
  );

  const [pwRegErrorText, setPwRegErrorText] = useState(
    '숫자, 영문(소·대문자), 특수문자를 포함한 8~16자리',
  );

  const [nickRegErrorText, setNickRegErrorText] = useState(
    '닉네임을 한글, 대소문자, 숫자를 조합해서 2~12자리를 입력하세요',
  );

  const [emailRegErrorText, setEmailRegErrorText] = useState(
    '이메일이 작성되지 않았거나 형식이 올바르지 않습니다!',
  );

  const [reCheckPwRegErrorText, setReCheckPwRegErrorText] = useState('');

  // 각 유효성 검사 에러문 텍스트 컬러 변경
  const idRegErrorStyle = useRef();
  const pwRegErrorStyle = useRef();
  const reCheckPwRegErrorStyle = useRef();
  const nickRegErrorStyle = useRef();
  const emailRegErrorStyle = useRef();

  // 유효성 시작

  // userId [유저 아이디] <-완료
  const checkUserId = (userId) => {
    const idRegExp = /^[a-z]{1}[a-z0-9]{5,15}$/;
    if (!idRegExp.test(userId)) {
      alert(
        '영문자(소문자) 또는 영문자(소문자)+숫자로 시작하는 6~16자리 아이디를 입력하세요!',
      );
      userId.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // userPw [비밀번호 확인] <- 완료
  const checkUserPw = (userId, userPw, checkPw) => {
    // 숫자, 영문자, 특수문자 포함한 8~16자리 유효성 순서 상관없음
    const userPWRegExp = /^(?=.*[a-zA-Z])(?=.*[#?!@$%^&*-])(?=.*[0-9]).{8,16}$/;
    if (!userPWRegExp.test(userPw)) {
      alert('숫자, 영문(소·대문자), 특수문자를 포함한 8~16자리를 입력하세요!');
      userPw.focus();
      return false;
    }
    //비밀번호와 비밀번호 확인이 맞지 않다면.
    if (userPw !== checkPw) {
      alert('두 비밀번호가 맞지 않습니다.');
      checkPw.focus();
      return false;
    }
    //아이디와 비밀번호가 같을 때.
    if (userId === userPw) {
      alert('아이디와 비밀번호는 같을 수 없습니다!');
      checkPw.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // userName [이름 입력 확인] <-완료
  const checkName = (userName) => {
    // 2~6글자 한글 또는 영문 대소문자 이름
    const nameRegExp = /^[가-힣a-zA-Z]{2,12}$/;
    if (!nameRegExp.test(userName)) {
      alert('한글 또는 영어 이름을 공백 없이 2~12자리로 입력하세요!');
      userName.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // userNick [유저 닉네임] <- 완료
  const checkNick = (userNick) => {
    // 한글, 영어 숫자 섞어서 닉네임 가능
    const nickRegExp = /[가-힣a-zA-Z0-9].{2,12}$/;
    if (!nickRegExp.test(userNick)) {
      alert('닉네임을 한글, 대소문자, 숫자를 조합해서 2~12자리를 입력하세요!');
      userNick.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // userEamil [이메일 입력 확인] <-완료
  const checkEmail = (userEmail) => {
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{2,3}$/;
    if (!emailRegExp.test(userEmail)) {
      alert('이메일이 작성되지 않았거나 형식이 올바르지 않습니다!');
      userEmail.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // userPhone [핸드폰 번호] <-완료
  const checUserPhone = (userPhone) => {
    //핸드폰 번호가 제대로 입력되었는지 확인하기
    const userPhoneRegExp = /^[0-9]{3}[0-9]{4}[0-9]{4}$/;
    if (!userPhoneRegExp.test(userPhone)) {
      alert('핸드폰 번호를 -과 공백 없이 입력해야 합니다!');
      userPhone.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // address [주소]
  const checAddress = (address) => {
    const AddressRegExp = /^[가-힣a-zA-z0-9]{1,20}$/;
    if (!AddressRegExp.test(address)) {
      alert('주소를 입력해야합니다!');
      address.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // extraAddress [상세주소]
  const checExtarAddress = (extraAddress) => {
    const ExtarAddressRegExp =
      /^[가-힣a-zA-z0-9]{2,11}-[가-힣a-zA-z0-9]{2,11}$/;
    if (!ExtarAddressRegExp.test(extraAddress)) {
      alert('상세 주소를 입력해야합니다!');
      extraAddress.focus();
      return false;
    }
    return true; //확인이 완료되었을 때
  };

  // 유효성 끝

  // 아이디 유효성 검사
  useEffect(() => {
    if (inputId === '' || inputId === undefined) {
      setIdRegErrorText(
        '영문자(소문자) 또는 영문자(소문자)+숫자로 시작하는 6~16자리',
      );
      idRegErrorStyle.current.style.color = '#494949';
    } else if (idRegex.test(inputId) === false) {
      setIdRegErrorText(
        '영문자(소문자) 또는 영문자(소문자)+숫자로 시작하는 6~16자리',
      );
      idRegErrorStyle.current.style.color = 'red';
    } else if (idRegex.test(inputId) === true) {
      setIdRegErrorText('올바른 형식의 아이디입니다. 중복을 확인 해주세요.');
      idRegErrorStyle.current.style.color = '#25d039';
    }
  }, [inputId]);

  // 비밀번호 / 비밀번호 재확인 유효성 검사
  useEffect(() => {
    if (inputPw === '' || inputPw === undefined) {
      setPwRegErrorText('숫자, 영문(소·대문자), 특수문자를 포함한 8~16자리');
      pwRegErrorStyle.current.style.color = '#494949';
    } else if (pwRegex.test(inputPw) === false) {
      setPwRegErrorText('숫자, 영문(소·대문자), 특수문자를 포함한 8~16자리');
      pwRegErrorStyle.current.style.color = 'red';
    } else if (pwRegex.test(inputPw) === true) {
      setPwRegErrorText('올바른 형식의 비밀번호 입니다.');
      pwRegErrorStyle.current.style.color = '#25d039';
    }

    // 비밀번호 재확인
    if (reInputPw === '' || reInputPw === undefined) {
      setReCheckPwRegErrorText('');
      reCheckPwRegErrorStyle.current.style.color = '#494949';
    } else if (inputPw !== reInputPw) {
      setReCheckPwRegErrorText('비밀번호가 일치하지 않습니다.');
      reCheckPwRegErrorStyle.current.style.color = 'red';
    } else {
      setReCheckPwRegErrorText('비밀번호가 일치합니다.');
      reCheckPwRegErrorStyle.current.style.color = '#25d039';
    }
  }, [inputPw, reInputPw]);

  // 닉네임 유효성 검사
  useEffect(() => {
    if (inputNick === '' || inputNick === undefined) {
      setNickRegErrorText(
        '닉네임을 한글, 대소문자, 숫자를 조합해서 2~12자리를 입력하세요',
      );
      nickRegErrorStyle.current.style.color = '#494949';
    } else if (nickRegex.test(inputNick) === false) {
      setNickRegErrorText(
        '닉네임을 한글, 대소문자, 숫자를 조합해서 2~12자리를 입력하세요',
      );
      nickRegErrorStyle.current.style.color = 'red';
    } else if (nickRegex.test(inputNick) === true) {
      setNickRegErrorText('올바른 형식의 닉네임입니다. 중복을 확인 해주세요.');
      nickRegErrorStyle.current.style.color = '#25d039';
    }
  }, [inputNick]);

  // 이메일 유효성 검사
  useEffect(() => {
    if (inputEmail === '' || inputEmail === undefined) {
      setEmailRegErrorText(
        '이메일이 작성되지 않았거나 형식이 올바르지 않습니다!',
      );
      emailRegErrorStyle.current.style.color = '#494949';
    } else if (emailRegex.test(inputEmail) === false) {
      setEmailRegErrorText(
        '이메일이 작성되지 않았거나 형식이 올바르지 않습니다!',
      );
      emailRegErrorStyle.current.style.color = 'red';
    } else if (emailRegex.test(inputEmail) === true) {
      setEmailRegErrorText('올바른 형식의 이메일입니다. 중복을 확인 해주세요.');
      emailRegErrorStyle.current.style.color = '#25d039';
    }
  }, [inputEmail]);

  // 약관보기 1창 show/hide
  const [showTou, setShowTou] = useState(false);

  // 약관 동의 체크 버튼
  const allTouCheck = useRef();
  const tou1 = useRef();
  const tou2 = useRef();

  // 약관 전체 동의 클릭
  const clickAllTouCheck = (e) => {
    if (tou1.current.checked === false || tou2.current.checked === false) {
      tou1.current.checked = true;
      tou2.current.checked = true;
      joinBtn.current.disabled = false;
    } else if (e.target.checked === false) {
      tou1.current.checked = false;
      tou2.current.checked = false;
      joinBtn.current.disabled = true;
    }
  };

  const clickAgree = (e) => {
    if (tou1.current.checked === true && tou2.current.checked === true) {
      joinBtn.current.disabled = false;
    } else if (
      tou1.current.checked === false ||
      tou2.current.checked === false
    ) {
      joinBtn.current.disabled = true;
    }
  };
  // const inputId = useRef(''); userId
  // const checkId = useState('');

  // 아이디 중복확인 버튼
  const clickDuplicateCheckBtn1 = async (e) => {
    e.preventDefault();
    console.log(idInput);
    await axios
      .post(`http://localhost:3001/auth/join/idCheck`, {
        userId: idInput.current.value,
      })
      .then((res) => {
        if (res.data === false) {
          alert('사용 가능한 아이디입니다.');
        } else if (res.data === true) {
          alert('이미 존재하는 아이디입니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 닉네임 중복확인 버튼
  const clickDuplicateCheckBtn2 = async (e) => {
    e.preventDefault();
    console.log(nickInput);

    alert('닉네임 중복확인');
    await axios
      .post(`http://localhost:3001/auth/join/nickCheck`, {
        userId: nickInput.current.value,
      })
      .then((res) => {
        if (res.data === false) {
          alert('사용 가능한 닉네임입니다.');
        } else if (res.data === true) {
          alert('이미 존재하는 닉네임입니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이메일 중복확인 버튼
  const clickDuplicateCheckBtn3 = async (e) => {
    alert('이메일 중복확인');
    e.preventDefault();
    console.log(emailInput);

    alert('닉네임 중복확인');
    await axios
      .post(`http://localhost:3001/auth/join/emailCheck`, {
        userId: emailInput.current.value,
      })
      .then((res) => {
        if (res.data === false) {
          alert('사용 가능한 이메일입니다.');
        } else if (res.data === true) {
          alert('이미 존재하는 이메일입니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 회원가입 동작
  const joinBtn = useRef();
  const clickSubmitBtn = (e) => {
    if (
      inputId === undefined ||
      inputPw === undefined ||
      inputName === undefined ||
      inputNick === undefined ||
      inputEmail === undefined ||
      inputPhone === undefined ||
      userInfo.zonecode === undefined ||
      inputSex === undefined ||
      tou1.current.checked === false ||
      tou2.current.checked === false
    ) {
      alert('빈칸이 존재합니다. 빠짐없이 입력해주세요.');
    }
    // join 유효성 검사
    if (
      checkUserId(inputId) &&
      checkUserPw(inputId, inputPw, reInputPw) &&
      checkName(inputName) &&
      checkNick(inputNick) &&
      checkEmail(inputEmail)
      // 주소 값 전달 미완
      // checUserPhone(inputPhone)&&
      // checAddress(address)&&
      // checExtarAddress(detailAddress)
    ) {
    }
    axios
      .post('http://localhost:3001/auth/join', {
        userId: inputId,
        userEmail: inputEmail,
        userPhone: inputPhone,
        userPw: inputPw,
        userName: inputName,
        userNick: inputNick,
        zonecode: userInfo.zonecode,
        address: userInfo.address,
        detailAddress: userInfo.detailAddress,
        region1: userInfo.region1,
        region2: userInfo.region2,
        region3: userInfo.region3,
        extraAddress: userInfo.extraAddress,
        userAge: inputAge,
        userSex: inputSex,
        location_agree: true,
        service_agree: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 'success') {
          alert('회원가입이 완료되었습니다.');
          navigate('/login');
        } else {
          alert('다시 시도해 주세요.');
        }
      });
  };

  const touModal = useRef();

  return (
    <>
      <div className="join-container">
        <p>아이디</p>
        <input
          className="id-input"
          type="text"
          name="userId"
          placeholder="아이디를 입력하세요"
          ref={idInput}
          onChange={(e) => {
            setInputId(e.target.value);
          }}
        />
        <button onClick={clickDuplicateCheckBtn1} className="duplicate-check">
          중복확인
        </button>
        <p className="idRegError" ref={idRegErrorStyle}>
          {idRegErrorText}
        </p>

        <p>비밀번호</p>
        <input
          className="pw-input"
          type="password"
          name="userPw"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setInputPw(e.target.value);
          }}
        />
        <p className="pwRegError" ref={pwRegErrorStyle}>
          {pwRegErrorText}
        </p>

        <p>비밀번호 재입력</p>
        <input
          className="pw-re-input"
          type="password"
          name="checkPw"
          placeholder="비밀번호를 재입력하세요"
          onChange={(e) => {
            setReInputPw(e.target.value);
          }}
        />
        <p className="pwReCheckRegError" ref={reCheckPwRegErrorStyle}>
          {reCheckPwRegErrorText}
        </p>

        <p>이름</p>
        <input
          className="name-input"
          type="text"
          name="userName"
          placeholder="이름을 입력하세요"
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        />

        <p>닉네임</p>
        <input
          className="nick-input"
          type="text"
          name="userNick"
          ref={nickInput}
          placeholder="닉네임을 입력하세요"
          onChange={(e) => {
            setInputNick(e.target.value);
          }}
        />
        <button onClick={clickDuplicateCheckBtn2} className="duplicate-check">
          중복확인
        </button>
        <p className="nickRegError" ref={nickRegErrorStyle}>
          {nickRegErrorText}
        </p>

        <p>이메일</p>
        <input
          className="email-input"
          type="email"
          name="userEmail"
          ref={emailInput}
          placeholder="이메일을 입력하세요"
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
        />
        <button onClick={clickDuplicateCheckBtn3} className="duplicate-check">
          중복확인
        </button>
        <p className="emailRegError" ref={emailRegErrorStyle}>
          {emailRegErrorText}
        </p>

        <p>휴대폰 번호</p>
        <input
          className="phone-input"
          type="text"
          name="userPhone"
          placeholder="휴대폰 번호를 입력하세요"
          onChange={(e) => {
            setInputPhone(e.target.value);
          }}
        />

        <p>주소</p>
        <DaumPostStyle>
          <DaumPostHook
            savingAddressInput={savingAddressInput}
            zonecode={zonecode}
            address={address}
            detailAddress={detailAddress}
          />
        </DaumPostStyle>

        <p>연령대</p>
        <select
          className="ages-select"
          name="userAge"
          onChange={(e) => {
            setInputAge(e.target.value);
          }}
        >
          <option value="0">연령대를 선택하세요</option>
          <option value="10">10대</option>
          <option value="20">20대</option>
          <option value="30">30대</option>
          <option value="40">40대</option>
          <option value="50">50대</option>
          <option value="60">60대 이상</option>
        </select>
        <br />

        <p>성별</p>
        <input
          type="radio"
          name="userSex"
          id="male"
          value="male"
          onChange={(e) => {
            setInputSex(e.target.value);
          }}
        />
        <label htmlFor="male">남자</label>
        <input
          type="radio"
          name="userSex"
          id="female"
          value="female"
          onChange={(e) => {
            setInputSex(e.target.value);
          }}
        />
        <label htmlFor="female">여자</label>

        <br />
        <br />

        <div className="show-terms-of-use">
          <div>
            <input
              ref={allTouCheck}
              onClick={clickAllTouCheck}
              type="checkbox"
              value="all-agree"
              id="all-terms-of-use"
            />
            <label htmlFor="all-terms-of-use">약관 전체 동의</label>
          </div>
          <p
            className="show"
            onClick={() => {
              setShowTou(!showTou);
            }}
          >
            약관보기
          </p>
        </div>

        <div className="terms-of-use-01">
          <input
            ref={tou1}
            type="checkbox"
            name="locationAgree"
            id="lo-agree"
            onClick={clickAgree}
          />
          <label htmlFor="lo-agree">
            위치기반 서비스 이용약관에 동의합니다.
          </label>
        </div>

        <div className="terms-of-use-02">
          <input
            ref={tou2}
            type="checkbox"
            name="serviceAgree"
            id="svc-agree"
            onClick={clickAgree}
          />
          <label htmlFor="svc-agree">서비스 이용약관에 동의합니다.</label>
        </div>

        <Link to="/login">
          <button className="back-btn">뒤로가기</button>
        </Link>
        <button className="join-btn" ref={joinBtn} onClick={clickSubmitBtn}>
          회원가입
        </button>
      </div>

      {/* 이용 약관 모달창 */}
      {showTou ? (
        <div className="tou-modal-wrapper">
          <div ref={touModal} className="tou-modal-container">
            <h3>위치기반 서비스 이용약관</h3>
            <textarea
              readOnly
              value="제1조(목적) - 이 약관은 회사가(이하 'P＆P') 제공하는 위치기반서비스에 대해 P＆P와 위치기반서비스를 이용하는 개인위치정보주체(이하 '이용자')간의 권리·의무 및 책임사항, 기타 필요한 사항 규정을 목적으로 합니다."
            ></textarea>
            <h3>Pet ＆ Pet 서비스 이용약관</h3>
            <textarea
              readOnly
              value="제1조(목적) - 이 약관은 회사가 온라인으로 제공하는 디지털 콘텐츠 (이하 'P＆P'라고 한다) 및 제반 서비스의 이용과 관련하여 P＆P와 이용자와의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다."
            ></textarea>
            <br />
            <button
              onClick={() => {
                setShowTou(!showTou);
              }}
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
      <Footer />
    </>
  );
};

export default Join;
