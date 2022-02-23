const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors());

//router
var matchRouter = require('./routes/Match');
app.use('/match', matchRouter);

var chatRouter = require('./routes/Chat');
app.use('/chat', chatRouter);


const port =process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})