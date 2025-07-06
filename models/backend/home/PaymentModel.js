
function PaymentModel() {
  this.addPayment = function(patient_id, amount, method, date, note) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO payments (patient_id, amount, method, date, note) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [patient_id, amount, method, date, note], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  this.getPayments = function() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM payments', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };
}


module.exports = new PaymentModel();