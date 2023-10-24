const expenseController = require('../controllers/expense.controller');

module.exports = (app) => {
    app.get('/api', expenseController.index);
    app.post('/api/add-expense', expenseController.createExpense);
    app.get('/api/get-expense', expenseController.getAllExpense); 
    app.get('/api/get/:id', expenseController.getExpense);
    app.delete('/api/delete-expense/:id', expenseController.deleteExpense);
    app.post('/api/expenses/edit/:id', expenseController.updateExpense);
    app.get('/api/calculate', expenseController.calculateTotalExpenses);
}
