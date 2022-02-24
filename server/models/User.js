'use strict'

// 회원 정보를 갖고 있는 곳
const UserStorage = require('./UserStorage')

class User {
  constructor(body) {
    this.body = body
  }

  async login() {
    // db 정보 userStorage를 참조함.
    const db = this.body
    try {
      // .then()으로도 접근하여 데이터를 갖고 올 수 있는데 await는 가독성이 좋아서 사용된 것이다.
      // 데이터를 바로 갖고 오기 몇개 갖고올지는 안정해진 것임
      const user = await UserStorage.getUserInfo(db.userId)
      // 오브젝트 안에 넣은 값
      if (user) {
        // id와 pw가 같으면 접속 성공 반환
        if (user.userId === db.userId && user.userPw === db.userPw) {
          return { success: true }
        }
        // db password error
        return { success: false, msg: '비밀번호가 틀렸습니다.' }
      }
      // db 참조 실패시 id error
      return { success: false, msg: '존재하지 않는 아이디입니다.' }
    } catch (err) {
      // 전체 db에서 발생한 error값
      return { success: false, err }
    }
  }

  // 회원가입 로직
  async join() {
    // mysql db 연결 위치 body parser를 이용
    const db = this.body
    // try - catch 문을 이용해서 가두기
    try {
      // 데이터를 갖고 오기 위해서 await를 사용해줬고 가독성이 좋아서 사용된 것이다. 이후 데이터 값 저장
      const response = await UserStorage.save(db)
      // 반환
      return response
    } catch (err) {
      // error 처리
      return { success: false, err }
    }
  }
}

// user 모듈
module.exports = User
