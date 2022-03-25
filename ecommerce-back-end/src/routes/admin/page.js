const express = require('express');
const { upload, requireSignin, adminMiddleware } = require('../../common-middleware');
const { createPage, getPage } = require('../../controllers/admin/page-controller');
const router = express.Router();

router.post('/page/create',requireSignin,adminMiddleware,upload.fields([
    { name: 'banners' },
    { name: 'products' }

    //meken puluwan ekama eke images warga 2k yawanna.
]),createPage)

router.get(`/page/:category/:type`, getPage)

module.exports = router;