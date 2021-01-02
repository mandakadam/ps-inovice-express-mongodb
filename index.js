const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// PORT 
const PORT = process.env.PORT || 3000
app.listen(PORT, err=>{
    if(err) throw err;
    console.log(`Server is running on ${PORT}`)
})

app.get('/', (req, res)=>{
    res.send('Test Data')
})

//User Mongoose DB Connection
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Database Connected...'))
.catch(err=>{
    console.log(err)
})
