const router = require('express').Router();
const verifyToken = require('../utils/verifyToken')
const CD = require('../models/ClientDetails')

router.post('/read', verifyToken, (req, res) => {
    // res.send(req.user)
    CD.find(req.body.filters || {}, (err, items) => {
        if (err) res.send(err);
        res.json(items);
    });
    if(req.body.filter){
        
    }
});

router.post('/read/:invoice_ref', verifyToken, async (req, res) => {
    const isInvoiceExist = await CD.findOne({ invoice_ref: req.params.invoice_ref })
    if (!isInvoiceExist) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Invoice not found!' });

    try {
        res.json(isInvoiceExist);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/update/:invoice_ref', verifyToken, async (req, res) => {
    const isInvoiceExist = await CD.findOne({ invoice_ref: req.params.invoice_ref })
    if (!isInvoiceExist) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Invoice not found!' });

    try {
        const updateClient = await CD.findOneAndUpdate(
            { invoice_ref: req.params.invoice_ref },
            req.body,
            { new: true }
        );
        res.send({
            'status': 'success',
            'msg': `Invoice (${req.params.invoice_ref}) updated successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.delete('/delete/:invoice_ref', verifyToken, async (req, res) => {
    const isInvoiceExist = await CD.findOne({ invoice_ref: req.params.invoice_ref })
    if (!isInvoiceExist) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Invoice not found!' });

    try {
        const updateClient = await CD.deleteOne({ invoice_ref: req.params.invoice_ref })
        res.send({
            'status': 'success',
            'msg': `Invoice (${req.params.invoice_ref}) deleted successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});


router.post('/create', verifyToken, async (req, res) => {
    const isInvoiceExist = await CD.findOne({ invoice_ref: req.body.invoice_ref, client_id: req.body.client_id })
    if (isInvoiceExist) return res.status(400).send({ 'status': 'unsuccess', 'msg': 'Invoice id already exists!' });

    const newClientDetail = new CD(req.body);

    try {
        const saveClient = await newClientDetail.save();
        res.send({
            'status': 'success',
            'msg': `New invoice (${req.body.client_id}) created successfully`
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router