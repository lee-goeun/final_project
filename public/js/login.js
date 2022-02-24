'use strict'

const userId = document.querySelector('#userId'),
  userPw = document.querySelector('#userPw'),
  loginBtn = document.querySelector('#button')

loginBtn.addEventListener('click', login)

function login() {
  if (!userId.value) return alert('아이디를 입력해주십시오.')
  if (!userPw.value) return alert('비밀번호를 입력해주십시오.')

  const req = {
    userId: userId.value,
    userPw: userPw.value,
  }

  // 값을 받아옴
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    // json 값을 확인하는 코드
    .then((res) => res.json())
    .then((res) => {
      // login 성공하면 main page로 이동
      if (res.success) {
        location.href = '/'
      } else {
        if (res.err) return alert(res.err)
        alert(res.msg)
      }
    })
    // 실패 에러 처리 <- console에서 나오는 에러
    .catch((err) => {
      console.error('로그인 중 에러 발생')
    })
}
