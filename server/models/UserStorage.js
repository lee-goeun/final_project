'use strict'

//db 연결 드디어 됐다 킼킼
const db = require('../config/mysql')

class UserStorage {
  // user 정보
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      // ID 확인 쿼리
      const query = 'SELECT * FROM usertbl WHERE user_id = ?;'
      db.query(query, [user_id], (err, data) => {
        if (err) reject(`${err}`)
        else resolve(data[0])
      })
    })
  }

  // ID 저장 table test용 쿼리
  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO usertbl(user_id, user_name, user_pw, user_nick, user_phone) VALUES(?, ?, ?, ?, ?);'
      db.query(
        query,
        [
          userInfo.user_id,
          userInfo.user_name,
          userInfo.user_pw,
          userInfo.user_nick,
          userInfo.user_phone,
        ],
        (err) => {
          if (err) reject(`${err}`)
          else resolve({ success: true })
        }
      )
    })
  }
}

module.exports = UserStorage
