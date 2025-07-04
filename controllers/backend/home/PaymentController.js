const paymentModel = require('../../../models/backend/home/PaymentModel');

exports.listPayments = (req, res) => {
  paymentModel.getPayments()
    .then(payments => res.render('payments/list', { payments }))
    .catch(() => res.send('Database error'));
};

exports.showAddPayment = (req, res) => {
  res.render('payments/add', { error: null });
};

exports.addPayment = (req, res) => {
  const { patient_id, amount, method, date, note } = req.body;
  paymentModel.addPayment(patient_id, amount, method, date, note)
    .then(() => res.redirect('/payments'))
    .catch(() => res.render('payments/add', { error: 'Database error' }));
};

