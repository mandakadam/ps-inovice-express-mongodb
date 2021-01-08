const router = require('express').Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const User = require('../models/User');
const {registervalidaton, loginvalidaton} =  require('../utils/validation');


router.post('/register', async(req, res)=>{
    const {error} = registervalidaton(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).send('Email already exists');

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt)


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    })
    try{
        const createUser = await user.save()
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', async(req, res)=>{
    const {error} = loginvalidaton(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email})
    console.log(user)
    if(user && !user.active) return res.status(400).json({ 'status': 'unsuccess', 'msg': 'User is not verified yet.'});

    if(!user) return res.status(400).json({ 'status': 'unsuccess', 'msg': 'Email or Password is wrong'});

    const validate_pass = await bcrypt.compare(req.body.password, user.password)
    if(!validate_pass) return res.status(400).json({ 'status': 'unsuccess', 'msg': 'Email or Password is wrong'})

    //Create and assign a token
    var token = jwt.sign({ _id: user.id }, process.env.PRIVATE_TOKEN);
    res.header('auth-token', token).json({ 'status': 'success', 'msg': 'Logged in', "token":token})

    res.send("Logged in!")

})

module.exports = router;