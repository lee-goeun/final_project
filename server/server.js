const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use('/api', bodyParser.urlencoded({extended: false})); 
app.use('/api', bodyParser.json());

app.use(cors());

var matchRouter = require('./routes/Match');
app.use('/match', matchRouter);

//var chatRouter = require('./routes/Chat');
//app.use('/api/chat', chatRouter);

const port =process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})