const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [8, 'Title must be at least 8 characters long']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        default: "income"
    },
    date: {
        type: Date,
        required: true,
       
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
      
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [8, 'Description must be at least 8 characters long'],
      
    },
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);
