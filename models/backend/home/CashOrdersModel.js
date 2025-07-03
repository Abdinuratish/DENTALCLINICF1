function CashOrdersModel(){

        // Insert a order's information cashorder_register
this.order_register = function (studentId,editAmount1,description) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO `cashorders` (stdid, amount, descriptions) VALUES (?, ?, ?)';
        const values = [studentId,editAmount1,description];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};


this.getAllorders_filter = function (startdate, enddate, status) {
      // Log the startdate and enddate 
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                c.id,
                s.name, 
                s.phone, 
                c.amount, 
                c.statusid, 
                DATE_FORMAT(c.createddate, '%Y/%m/%d %H:%i:%s') AS createddate, 
                s.address
            FROM 
                students s
            JOIN 
                cashorders c 
            ON 
                s.id = c.stdid
            WHERE 
                c.createddate BETWEEN ? AND ? 
                AND c.statusid like ?
        `;

        // Use parameters to safely pass values
        const params = [startdate, enddate, `%${status}%`];

        connection.query(query, params, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};


this.getAllorders = function () {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT   c.id,
                s.name,
                c.descriptions, 
                s.phone, 
                c.amount, 
                c.statusid, 
                DATE_FORMAT(c.createddate, '%Y/%m/%d %H:%i:%s') AS createddate, 
                s.address
            FROM 
                students s
            JOIN 
                cashorders c 
            ON 
                c.stdid = s.id
        `;
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}; 


// Update a order's information my CashOrdersModel();

this.edit_order = function (amount, statusid, id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE `cashorders` SET amount = ?, statusid = ? WHERE id = ?';
        const values = [amount, statusid, id];
        connection.query(query, values, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Delete a order
this.delete_order = function (id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM `cashorders` WHERE id = ?';
        connection.query(query, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

this.getCashOrdersPending = function () {
    return new Promise((resolve, reject) => {
        const query = `
             SELECT COUNT(*) AS total_count FROM patients WHERE statusid = 0
        `;
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

this.getCashOrdersAproved = function () {
    return new Promise((resolve, reject) => {
        const query = `
             SELECT COUNT(*) AS total_count FROM patients WHERE statusid = 1
        `;
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

this.getCashOrdersRejected = function () {
    return new Promise((resolve, reject) => {
        const query = `
             SELECT COUNT(*) AS total_count FROM cashorders WHERE statusid = 2
        `;
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Database Fetch Error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};




}
module.exports = new CashOrdersModel();