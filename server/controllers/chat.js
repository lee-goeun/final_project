const {Chat} = require("../models/Chat");
const conn = require("../db/index");

//리스트 조회
let listChat = (req, res) => {
    let keyword = req.params.keyword;

    var sql = "select * from matchTbl where matchDeleted = 0 and (matchTitle like concat('%?%' ) OR matchContent like concat('%?%' ))";
    conn.query(sql, keyword, (err, results) => {
        console.log("&&&&&&" ,results);
        var matches = new Array();
        if(err) return res.json({success:false, err});
        else res.json(results);
    })
}