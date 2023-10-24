const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    date: {
        type: String,
        minlength: [3, "The date must be at least 3 characters long"],
        required: [true, "Date is required"]
    },
    description: {
        type: String,
        minlength: [3, "The description must be at least 3 characters long"],
       
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
