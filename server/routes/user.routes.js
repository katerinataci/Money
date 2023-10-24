
const UserController = require('../controllers/user.controller'); 
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.post('/api/users',authenticate, UserController.createUser);
    app.get('/api/user',authenticate, UserController.getAllUsers); 
    app.delete('/api/user/:id',authenticate, UserController.deleteUser);
    app.get('/api/user/:id', UserController.getUser);
    app.patch('/api/user/:id', UserController.updateUser);
    app.post('/api/message',UserController.message)
}
