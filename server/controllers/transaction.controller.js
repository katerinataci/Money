const Transaction = require('../models/transaction.model');
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
/* The method below is new */
module.exports.createTransaction = async (request, response) => {
    
    Transaction.exists({ date: request.body.date })  
        .then(userExists => {
            if (userExists) {
                // Promise.reject() will activate the .catch() below.
                return Promise.reject({errors : {date:{message:"this date is used before"}}});
            }else{
            return Transaction.create(request.body)
            
          
        }
        })
        .then(transaction => response.json(transaction))
        .catch(err => response.json(err));
      
}

module.exports.getAllTransaction = (request, response) => {

    Transaction.find()
        .then(transactions => {
            response.json(transactions);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getTransaction = (request, response) => {
    Transaction.findOne({ _id: request.params.id })
        .then(transaction => response.json(transaction))
        .catch(err => response.json(err));
}
module.exports.updateTransaction = (request, response) => {

    Transaction.exists({ date: request.body.date })  
        .then(userExists => {
            if (userExists) {
                
                return response.json("ekziston");
            }else{
                Transaction.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
                .then(updatedTransaction => response.json(updatedTransaction))
                .catch(err => response.json(err))
        }
        })

    
}

module.exports.deleteTransaction = (request, response) => {
    Transaction.deleteOne({ _id: request.params.transactionId }) //note: "id" here MUST match id in corresponding route
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}


