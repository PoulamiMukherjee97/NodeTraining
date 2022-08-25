const express = require('express');
const userController = require('../../controllers/users.controllers');
const router = express.Router();
/* GET users listing. */
router.get('/', userController.getUsers);
/* POST - create user */
router.post('/', userController.create);
/* GET - to fetch user details */
/* Let's handle URL Param - id is the URL param*/
router.get('/:id', userController.findOne);
module.exports = router;