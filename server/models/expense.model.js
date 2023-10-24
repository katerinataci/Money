const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[ true,'tittle is required'],
        minLength: [8, 'Title must be at least 8 characters long']
    },
    amount: {
        type: Number,
        required:[ true,'amount is required']
    },
    type: {
        type: String,
        required:[ true,'type is required'],
        default:"expense"
    },
    date: {
        type: Date,
        required:[ true,'date is required']
    },
    category: {
        type: String,
        required:[ true,'category is required']
    },
    description: {
        type: String,
        required:[ true,'description is required'],
        minLength: [8, 'Description must be at least 8 characters long']
    },
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)