const express = require('express');
const authRoute = require('./routes/auth.route')
const projectRoute = require('./routes/project.route')
const cors = require('cors')

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Working')
});

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

app.use('/admin', authRoute);
app.use('/project', projectRoute);

module.exports = app;