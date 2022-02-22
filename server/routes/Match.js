const express = require("express");
const conn = require("../db/index");
const router = express.Router();

const controller = require("../controllers/match");
const { json } = require("body-parser");

//조회
router.get('/list', (req, res) => {
    let keyword = "%"+req.query.keyword+"%";
    var sql = "select * from matchTbl where matchDeleted = 0 and (matchTitle like ? or matchContent like ?)";

    conn.query(sql,[keyword, keyword],(err, results) => {
        if(err) return res.json({success:false, err});
        else res.json(results);
    });
})

//조회(1시간이내)
router.get('/listLimit1',(req, res) => {
    var sql = "select * from matchTbl where matchDelted = 0 and matchTime between now() and  DATE_ADD(now(), INTERVAL +1 HOUR) order by matchTime;";
    conn.query(sql, (err, results) => {
        if(err) return res.json({success:false, err});
        else res.json(results);
    })
});

//추가
//router.post('/add',  controller.addMatch);

//상세
//router.get('/form/:id', controller.modMatchFrom);

//수정
//router.put('/mod', controller.modMatch);

//삭제
//router.put('/del/:id', controller.delMatch);

module.exports = router;