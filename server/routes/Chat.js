const express = require("express");
const router = express.Router();

const controller = require("../controllers/chat");

//조회
//router.get('/list', controller.listChat);

//추가(리스트)
//router.post('/addList/:id', controller.addChatList);

//추가(상세)
router.post('/addMsg/:id',  controller.addChatMsg);

//상세
router.get('/form/:id', controller.detailChat);


module.exports = router;