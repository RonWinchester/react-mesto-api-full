const usersRouter = require('express').Router();
const { userValidation, editProfileValidation, editAvatarValidation } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  editProfile,
  editAvatar,
  getUserInfo,
} = require('../controllers/users');

usersRouter.get('/users/me', getUserInfo);
usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', userValidation, getUser);
usersRouter.patch('/users/me', editProfileValidation, editProfile);
usersRouter.patch('/users/me/avatar', editAvatarValidation, editAvatar);

module.exports = usersRouter;
