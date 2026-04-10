const express = require('express');
const authRoute = require('./routes/auth.route')

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Working')
});

app.use('/admin', authRoute);

module.exports = app;