const mysql = require("mysql");

module.exports = ((sequelize, Sequelize) => {
    sequelize.define('Match',{
        matchId : {
            type:Sequelize.Number
        },
        chatroomId : {
            type:Sequelize.Number
        },
        user_id : {
            type:Sequelize.String,
            required:true
        },
        matchTitle : {
            type:Sequelize.String
        },
        matchContent : {
            type:Sequelize.String
        },
        matchTime : {
            type:Sequelize.Date
        },
        selectPet : {
            type:Sequelize.String,
            required:true
        },
        matchCreated : {
            type:Sequelize.Date,
            default:Date.now()
        },
        matchMod : {
            type:Sequelize.Date
        },
        matchStatus : {
            type:Sequelize.Number,
            required:true,
            default:0 // 0:매칭안함 1:매칭됨
        },
        matchDeleted : {
            type:Sequelize.Number,
            required:true,
            default:0 // 0:삭제안함 1:삭제
        },
        matchImgName : {
            type:Sequelize.String
        }
    });
})