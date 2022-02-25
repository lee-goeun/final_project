'use strict'

const db = require('../config/mysql')

// const bcrypt = require('bcrypt')
const passport = require('passport')
const passportJWT = require('passport-jwt')
// const JWTStrategy = passportJWT.Strategy
const { ExtractJwt } = passportJWT
// const LocalStrategy = require('passport-local').Strategy

// #는 public에서 private로 변경해 준다.
// static은 class에 바로 접근을 위해서
class UserStorage {
  // html에서 id값을 확인한다.
  static getUserInfo(userId) {
    // 프로미스는 수행하는 동작이 끝남과 동시에 상태를 알려준다.
    // 그러므로 비동기 처리에 아주 효과적이다.

    // user table에서 값을 할당 받고 그 값을
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usertbl WHERE userId = ?;'
      db.query(query, [userId], (err, data) => {
        // object 형식(?)
        if (err) {
          reject(`${err}`)
          console.log(data)
        } else {
          // 로그인 데이터 보내주는 곳
          resolve(data[0])
        }
      })
    })
  }

  // db에서 값 받아올 때 token 값 할당
  // static getUserTokenInfo(userId) {
  //   return new Promise((resolve, reject) => {
  //     const jwtStrategyOption {
  //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       secretOrKey: 'jwt-secret-key',
  //     },
  //     const query = 'SELECT * FROM usertbl WHERE userId = ?;'
  //     const parms = [userId] //, fields
  //     await db.query(query, parms, async (err, data) => {
  //       if (err) {
  //         reject(`${err}`)
  //         console.log(data)
  //       } else {
  //         resolve(data[0])
  //       }
  //     })
  //   })
  // }

  // id 저장
  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      // bcrypt.hash( userPw, null, null, function(err, hash))  hash 값 이용해서 저장은 이후에 하기
      const query =
        'INSERT INTO usertbl(userId, userName, userPw, userNick, userPhone, zonecode, address, detailAddress, extraAddress, regDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, Now());'
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
// passport.use(new LocalStrategy(LocalStrategyOption, localVerify))
// passport.use(new JWTStrategy(jwtStrategyOption, jwtVerift))
