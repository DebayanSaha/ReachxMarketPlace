const express = require('express');
const authRoute = require('./routes/auth.route')
const projectRoute = require('./routes/project.route')
const clientRoute = require('./routes/client.route')
const cors = require('cors')

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://reachx-admin.vercel.app",
        "https://reachx-market-place.vercel.app",
        "https://reachxgroup.netlify.app",
    ],
    credentials: true
}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Working')
});



app.use('/admin', authRoute);
app.use('/project', projectRoute);
app.use('/client', clientRoute);

module.exports = app;