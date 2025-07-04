const userModel = require('../../../models/backend/home/UserModel');

exports.listUsers = (req, res) => {
    userModel.getUsers()
        .then(users => res.render('users/list', { users }))
        .catch(() => res.send('Database error'));
};

exports.showAddUser = (req, res) => {
    res.render('users/add', { error: null });
};

exports.addUser = (req, res) => {
    const { username, password, role } = req.body;
    userModel.addUser(username, password, role)
        .then(() => res.redirect('/users'))
        .catch(() => res.render('users/add', { error: 'Database error' }));
};

exports.showEditUser = (req, res) => {
    userModel.getUserById(req.params.id)
        .then(user => {
            if (!user) return res.send('User not found');
            res.render('users/edit', { user, error: null });
        })
        .catch(() => res.send('Database error'));
};

exports.editUser = (req, res) => {
    const { username, role } = req.body;
    userModel.updateUser(req.params.id, username, role)
        .then(() => res.redirect('/users'))
        .catch(() => res.render('users/edit', { user: { id: req.params.id, username, role }, error: 'Database error' }));
};

exports.deleteUser = (req, res) => {
    userModel.deleteUser(req.params.id)
        .then(() => res.redirect('/users'))
        .catch(() => res.send('Database error'));
};

// Additional functions can be added here for user management, such as password reset, role management, etc.
