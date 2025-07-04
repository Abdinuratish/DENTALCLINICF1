
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
this.getMonthlyTotal = function() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT SUM(amount) AS total
      FROM payments
      WHERE MONTH(date) = MONTH(CURRENT_DATE())
        AND YEAR(date) = YEAR(CURRENT_DATE())
    `;
    connection.query(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows[0].total || 0);
    });
  });
};

module.exports = new PaymentModel();