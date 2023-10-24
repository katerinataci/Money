const TransactionController = require('../controllers/transaction.controller');
module.exports = (app) => {
    app.get('/api', TransactionController.index);
    app.post('/api/transaction', TransactionController.createTransaction); 
    app.get('/api/transaction', TransactionController.getAllTransaction); 
    app.get('/api/transaction/:id', TransactionController.getTransaction);
    app.patch('/api/transaction/:id', TransactionController.updateTransaction);
    app.delete('/api/delete-transaction/:transactionId', TransactionController.deleteTransaction); //note: "id" here MUST match params in controller



    /* This is new */
}

