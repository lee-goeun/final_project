'use strict'

const db = require('../config/mysql')

// 비밀번호 암호화를 위한 선언문
// const bcrypt = require('bcrypt')

// #는 public에서 private로 변경해 준다.
// static은 class에 바로 접근을 위해서
class UserStorage {
  // html에서 id값을 확인한다.
  static getUserInfo(userId) {
    // 프로미스는 수행하는 동작이 끝남과 동시에 상태를 알려준다.
    // 그러므로 비동기 처리에 아주 효과적이다.
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usertbl WHERE userId = ?;'
      db.query(query, [userId], (err, data) => {
        // object 형식(?)
        if (err) {
          reject(`${err}`)
          console.log(data)
        } else {
          resolve(data[0])
        }
      })
    })
  }

  // id 저장
  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      // bcrypt.hash( userPw, null, null, function(err, hash))  hash 값 이용해서 저장은 이후에 하기
      const query =
        'INSERT INTO usertbl(userId, userName, userPw, userNick, userPhone, zonecode, address, detailAddress, extraAddress) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);'
      db.query(
        // db에 날려주는 쿼리문 저장
        query,
        [
          userInfo.userId,
          userInfo.userName,
          userInfo.userPw,
          userInfo.userNick,
          userInfo.userPhone,
          userInfo.zonecode,
          userInfo.address,
          userInfo.detailAddress,
          userInfo.extraAddress,
        ],
        // err 처리
        (err) => {
          if (err) reject(`${err}`)
          else resolve({ success: true })
        }
      )
    })
  }
}

module.exports = UserStorage
