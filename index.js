const bodyParser = require('body-parser');
var express = require('express');
var app = express();
const entity = require('./routes/entityRoute')
const user = require('./routes/userRoute');
const port = 3000;

app.use(bodyParser.json());

app.use('/myloft/v1/',entity)
app.use('/myloft/v1/',user)

app.get('/check',(req,res)=>{

    res.send('working');
    
})

app.listen(port , () =>{
console.log(`Server started at ${port}`)
})