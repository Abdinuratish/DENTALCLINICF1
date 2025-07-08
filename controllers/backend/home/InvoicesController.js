var medicineModel = require('../../../models/backend/home/MedicineModel');
var appointmentsModel = require('../../../models/backend/home/AppointmentsModel');
var patientsModel = require('../../../models/backend/home/PatientsModel');
var prescriptionsModel = require('../../../models/backend/home/PrescriptionsModel');
var InvoicesModel = require('../../../models/backend/home/InvoicesModel');
const { body, validationResult } = require('express-validator');

function InvoicesController() { 

    this.getInvoices = function (req, res) {
        Promise.all([
            InvoicesModel.getInvoices() 
        ])
        .then(([invoices]) => {
            res.render('backend/home/Invoices.ejs', {
                title: 'Dental clinic',
                content: 'View Invoices',
                invoices
            });
        })
        .catch(err => {
            res.status(500).send({ error: 'Failed to fetch data', details: err });
        });
    };

    // Show add invoice form
    this.showAddInvoice = function (req, res) {
        Promise.all([
            patientsModel.getPatients(),
            appointmentsModel.getAppointments()
        ])
        .then(([patients, appointments]) => {
            res.render('backend/home/AddInvoice.ejs', {
                title: 'Dental clinic',
                content: 'Add Invoice',
                patients,
                appointments,
                error: null
            });
        })
        .catch(() => res.render('backend/home/AddInvoice.ejs', {
            title: 'Dental clinic',
            content: 'Add Invoice',
            patients: [],
            appointments: [],
            error: 'Database error'
        }));
    };

    // Handle add invoice form submission
    this.addInvoice = function (req, res) {
        const { patient_id, appointment_id, total_amount, payment_status } = req.body;
        InvoicesModel.createInvoice(patient_id, appointment_id, total_amount, payment_status)
            .then(() => res.redirect('/viewInvoices'))
            .catch(() => res.render('backend/home/AddInvoice.ejs', {
                title: 'Dental clinic',
                content: 'Add Invoice',
                patients: [],
                appointments: [],
                error: 'Database error'
            }));
    };
}

module.exports = new InvoicesController;