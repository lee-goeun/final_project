'use strict'

// data 전달해줄 곳
// 아이디
const userId = document.querySelector('#userId'),
  // 이름
  userName = document.querySelector('#userName'),
  // 비밀번호
  userPw = document.querySelector('#userPw'),
  // 비밀번호 확인
  confirmPsword = document.querySelector('#confirm-psword'),
  // 닉네임
  userNick = document.querySelector('#userNick'),
  // 핸드폰 번호
  userPhone = document.querySelector('#userPhone'),
  // 0123~~같은 우편번호 원 파일 변수명 zonecode
  zonecode = document.querySelector('#zonecode'),
  // 주소 값 서울 관악구 봉천로xx ~~와 같이 주소값
  address = document.querySelector('#address'),
  // 추가 주소 <- ex 동~
  extraAddress = document.querySelector('#extraAddress'),
  // 상세 주소 값 <- [ex]~~ 원룸 xxx호
  detailAddress = document.querySelector('#detailAddress'),
  // 회원가입 버튼 <- 클릭 값 전달하는 부분 다시 보기?
  joinBtn = document.querySelector('#button')

// 버튼 클릭이벤트
joinBtn.addEventListener('click', join)

function join() {
  if (!userId.value) return alert('아이디를 입력해주십시오.')
  if (userPw.value !== confirmPsword.value)
    return alert('비밀번호가 일치하지 않습니다.')

  // 등록되는 값들
  const req = {
    userId: userId.value,
    userName: userName.value,
    userPw: userPw.value,
    userNick: userNick.value,
    userPhone: userPhone.value,
    zonecode: zonecode.value,
    address: address.value,
    extraAddress: extraAddress.value,
    detailAddress: extraAddress.value,
  }

  // fetch는 요청/응답을 진행해 준다.
  // 여기서는 method를 post로 줘서 값을 갖고온다.
  fetch('/join', {
    // 호출 받을 때
    method: 'POST',
    headers: {
      // json 타입
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/login'
      } else {
        if (res.err) return alert(res.err)
        alert(res.msg)
      }
    })
    // 에러처리
    .catch((err) => {
      console.error('회원가입 중 에러 발생')
    })
}
