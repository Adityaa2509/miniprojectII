const express = require('express');
const { updateUser, deleteUser, getUser, getUsers } = require('../controller/UserController');
const isAuth = require('../middleware/isAuth'); 
const router = express.Router();
router.get('/getusers', isAuth,getUsers);

router.put('/update/:userId', isAuth, updateUser);
router.delete('/delete/:userId', isAuth,deleteUser)
router.get('/:userId', getUser);

module.exports = router;
