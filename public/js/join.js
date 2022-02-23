'use strict'
// 회원 정보 저장
// @ts-check
const user_id = document.querySelector('#user_id'),
  user_name = document.querySelector('#user_name'),
  user_pw = document.querySelector('#user_pw'),
  user_nick = document.querySelector('#user_nick'),
  user_phone = document.querySelector('#user_phone'),
  confirmPsword = document.querySelector('#confirm-psword'),
  // 회원가입 버튼
  joinBtn = document.querySelector('#button')

// 버튼 클릭이벤트
joinBtn.addEventListener('click', join)

function join() {
  if (!user_id.value) return alert('아이디를 입력해주십시오.')
  // 패스워드 확인
  if (user_pw.value !== confirmPsword.value)
    return alert('비밀번호가 일치하지 않습니다.')

  // 등록되는 값
  const req = {
    user_id: user_id.value,
    user_name: user_name.value,
    user_pw: user_pw.value,
    user_nick: user_nick.value,
    user_phone: user_phone.value,
  }
  // fetch 호출시 브라우저는 네트워크 요청을 보내고 프라미스가 반환된다.
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
