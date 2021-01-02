const router = require('express').Router();

router.get('/register', (req, res)=>{
    res.send('Regisgtration')
})

module.exports = router;