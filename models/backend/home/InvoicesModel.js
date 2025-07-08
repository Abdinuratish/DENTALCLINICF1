function InvoicesModel() {
    // Fetch all invoices with related data
    this.getInvoices = function () {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    i.invoice_id,
                    DATE_FORMAT(i.invoice_date, '%Y/%m/%d %H:%i:%s') AS invoice_date,
                    i.total_amount, i.payment_status, CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
                    DATE_FORMAT(a.appointment_datetime, '%Y/%m/%d %H:%i:%s') AS appointment_datetime
                FROM invoices i
                JOIN patients p ON i.patient_id = p.id
                JOIN appointments a ON i.appointment_id = a.id
                ORDER BY i.invoice_date DESC
            `;        
            connection.query(query, (err, rows) => {
                if (err) { 
                    console.error('Database Fetch Error (Invoices):', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };

    // Add this method for creating invoices
    this.createInvoice = function(patient_id, appointment_id, total_amount, payment_status) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO invoices (patient_id, appointment_id, total_amount, payment_status, invoice_date)
                VALUES (?, ?, ?, ?, NOW())
            `;
            connection.query(query, [patient_id, appointment_id, total_amount, payment_status], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    };
}

module.exports = new InvoicesModel();