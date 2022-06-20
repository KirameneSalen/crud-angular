module.exports = app => {
    'use strict';
    const express = require('express');
    const carPersonCtrl = require('../controllers/carPersonCtrl')(app.locals.db);
    const router = express.Router();

    router.post('/', carPersonCtrl.create);
    router.get('/:id', carPersonCtrl.find);
    router.delete('/del', carPersonCtrl.destroy);

    return router;
};
