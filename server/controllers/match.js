const {Match} = require("../models/Match");
const conn = require("../db/index");
const multer = require('multer');

const upload = multer({dest:'uploads/', limits : {fileSize:5*1024*1024}});

//리스트 조회(검색_제목, 내용, 지역)
let listMatch = (req, res) => {
    let keyword = req.params.keyword;
    

    var sql = "select * from matchTbl where matchDeleted = 0 and (matchTitle like concat('%?%' ) OR matchContent like concat('%?%' ))";
    conn.query(sql, keyword, (err, results) => {
        console.log("&&&&&&" ,results);
        var matches = new Array();
        if(err) return res.json({success:false, err});
        else res.json(results);
    })
}

//리스트 조회(1시간이내)
let listMatchLimit1 = (req, res) => {
    var sql = "select * from matchTbl where matchDelted = 0 and matchTime between now() and  DATE_ADD(now(), INTERVAL +1 HOUR) order by matchTime;";
    
    conn.query(sql, (err, results) => {
        var matches = new Array();
        if(err) return res.json({success:false, err});
        else res.json(results);
    })
}

//게시글 작성
let addMatch = (req,res) => {
    upload.single(req.body.imgFileName);
    const match = new Match(req.body);

    var sql = "INSERT INTO matchTbl(user_id, matchImgName, matchTitle, matchContent, selectPet, matchTime) VALUES(?, ?, ?, ?,?, ?);";
    conn.query(sql, (err, results) => {
        if(err) return res.json({success:false, err});
        else res.json({status:"success"});
    })
}

//게시판 상세
let modMatchForm = (req, res) => {
    let id = req.params.id;
    var sql = "select * from matchTbl where matchId = ?";

    conn.query(sql, id, (err, results) => {
        if(err) return res.json({success:false, err});
        else res.json(results);
    })
}

//게시글 수정
let modMatch = (req, res) => {
    upload.single(req.body.imgFileName);
    const match = new Match(req.body);

    var sql = "UPDATE matchTbl set matchImgName=?, matchTitle=?, matchContent=?, selectPet=?, matchTime=? where matchId=?";
    conn.query(sql, [body.matchImgName, body.matchTitle, body.matchContent, body.selectPet, body.matchTime, body.matchId], 
        (err, results) => {
            if(err) return res.json({success:false, err});
            else res.json({status:"success"});
    })
}

//게시글 삭제
let delMatch = (req, res) => {
    let id = req.params.id;
    var sql = "UPDATE matchTbl set matchDeleted=1 where matchId=?";
    conn.query(sql, id, (err, results) => {
            if(err) return res.json({success:false, err});
            else res.json({status:"success"});
    })
}

module.export={
    addMatch : addMatch,
    listMatch : listMatch,
    listMatchLimit1 : listMatchLimit1,
    modMatchForm : modMatchForm,
    modMatch : modMatch,
    delMatch : delMatch
};