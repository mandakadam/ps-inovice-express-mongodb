const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors')

const app = express();


// PORT 
const PORT = process.env.PORT || 5000
app.listen(PORT, err=>{
    if(err) throw err;
    console.log(`Server is running on ${PORT}`)
});


//Middleware
app.use(express.json());

//Routes
const authRoute = require('./routes/auth');
const clientsRoute = require('./routes/clients');
const clientDetailsRoute = require('./routes/clientDetails');

app.use('/api/user', authRoute);
app.use('/api/clients', clientsRoute);
app.use('/api/client_details', clientDetailsRoute);


app.get('/', (req, res)=>{
    res.send('Test Data')
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(cors()); // <---- use cors middleware

//User Mongoose DB Connection
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Database Connected...'))
.catch(err=>{
    console.log(err)
})
