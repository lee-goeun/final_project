const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');



app.use('/api', bodyParser.urlencoded({extended: false})); 
app.use('/api', bodyParser.json());
app.use(cors());

var matchRouter = require('./routes/Match');
app.use('/api/match', matchRouter);


const port =process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})