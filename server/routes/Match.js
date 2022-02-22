const express = require("express");
const router = express.Router();

const controller = require("../controllers/match");

//조회
router.get('/list', controller.listMatch);

//조회(1시간이내)
router.get('/listLimit1', controller.listMatchLimit1);

//추가
router.post('/add',  controller.addMatch);

//상세
router.get('/form/:id', controller.modMatchFrom);

//수정
router.put('/mod', controller.modMatch);

//삭제
router.put('/del/:id', controller.delMatch);

module.exports = router;