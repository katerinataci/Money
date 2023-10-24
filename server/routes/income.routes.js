const incomeController = require('../controllers/income.controller');

module.exports = (app) => {
    app.get('/api', incomeController.index);
    app.post('/api/add-income', incomeController.createIncome);
    app.get('/api/get-income', incomeController.getAllIncome); 
    app.get('/api/income/:id', incomeController.getIncome);
    app.delete('/api/delete-income/:id', incomeController.deleteIncome);
    app.delete('/api/delete-transaction/:id', incomeController.deleteTransaction);
    app.post('/api/update/:id', incomeController.updateIncome);
    app.get('/api/total-incomes', incomeController.TotalIncomes);

}
