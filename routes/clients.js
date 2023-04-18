const router = require('express').Router();
const verifyToken = require('../utils/verifyToken')
const Clients = require('../models/Clients')

router.post('/read', (req, res) => {
    // res.send(req.user)
    Clients.find({}, (err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
});

router.post('/read/:client_id', async (req, res) => {
    const isClientExists = await Clients.findOne({ client_id: req.params.client_id })
    if (!isClientExists) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Client not found!' });

    try {
        res.send(isClientExists);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/update/:client_id', async (req, res) => {
    const isClientExists = await Clients.findOne({ client_id: req.params.client_id })
    if (!isClientExists) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Client not found!' });

    try {
        const updateClient = await Clients.findOneAndUpdate(
            { client_id: req.params.client_id },
            req.body,
            { new: true }
        );
        res.send({
            'status': 'success',
            'msg': `Client (${req.params.client_id}) updated successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.delete('/delete/:client_id', async (req, res) => {
    const isClientExists = await Clients.findOne({ client_id: req.params.client_id })
    if (!isClientExists) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Client not found!' });

    try {
        const updateClient = await Clients.deleteOne({ client_id: req.params.client_id })
        res.send({
            'status': 'success',
            'msg': `Client (${req.params.client_id}) deleted successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});


router.post('/create', async (req, res) => {
    const isClientExists = await Clients.findOne({ client_id: req.body.client_id,  name: req.body.name})
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