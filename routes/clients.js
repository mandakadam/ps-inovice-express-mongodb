const router = require('express').Router();
const verifyToken = require('../utils/verifyToken')
const Clients = require('../models/Clients')

router.get('/read', verifyToken, (req, res) => {
    // res.send(req.user)
    Clients.find({}, (err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
});

router.get('/read/:clientid', verifyToken, async (req, res) => {
    const isClientExists = await Clients.findOne({ name: req.params.clientid })
    if (!isClientExists) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Client not found!' });

    try {
        res.send(isClientExists);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/update/:clientid', verifyToken, async (req, res) => {
    const isClientExists = await Clients.findOne({ name: req.params.clientid })
    if (!isClientExists) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Client not found!' });

    try {
        const updateClient = await Clients.findOneAndUpdate(
            { name: req.params.clientid },
            req.body,
            { new: true }
        );
        res.send({
            'status': 'success',
            'msg': `Client (${req.params.clientid}) updated successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.delete('/delete/:clientid', verifyToken, async (req, res) => {
    const isClientExists = await Clients.findOne({ name: req.params.clientid })
    if (!isClientExists) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Client not found!' });

    try {
        const updateClient = await Clients.deleteOne({ name: req.params.clientid })
        res.send({
            'status': 'success',
            'msg': `Client (${req.params.clientid}) deleted successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});


router.post('/create', verifyToken, async (req, res) => {
    const isClientExists = await Clients.findOne({ name: req.body.name })
    if (isClientExists) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Client already exists!' });

    const newClient = new Clients(req.body);

    try {
        const saveClient = await newClient.save();
        res.send({
            'status': 'success',
            'msg': `New Client (${req.body.name}) created successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router