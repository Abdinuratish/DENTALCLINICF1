
function UserModel() {
    this.addUser = function(username, password, role) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
            connection.query(query, [username, password, role], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };

    this.getUsers = function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };

    this.getUserById = function(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
            });
        });
    };

    this.updateUser = function(id, username, role) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET username = ?, role = ? WHERE id = ?';
            connection.query(query, [username, role, id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };

    this.deleteUser = function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id = ?', [id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    };
}

module.exports = new UserModel();