
const Expense = require('../models/Expense.model');

module.exports.index = (request, response) => {  
    response.json({     
       message: "Connected"
    });
  }
module.exports.createExpense = (req, res) => {
  Expense.create(req.body)
    .then(expense => res.json(expense))
    .catch(err => res.status(500).json(err));
};
module.exports.getAllExpense = (request, response) => {
    Expense.find({}).sort({ name: 'asc' })
      .then(expenses => {
        response.json(expenses);
      })
      .catch(err => {
        console.error(err); 
        response.status(500).json(err); 
      });
  };
  module.exports.getExpense = (request, response) => {
    const id = request.params.id
    Expense.findOne({_id:id})
        .then(expense => response.json(expense))
        .catch(err => response.json(err));
  }
  module.exports.deleteExpense = (request, response) => {
    Expense.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
  }
  module.exports.updateExpense = (request, response) => {
    // console.log("ca marr nga frontendi")
    // console.log(request.body)
    Expense.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedExpense => response.json(updatedExpense))
        .catch(err => response.json(err))
};
  module.exports.calculateTotalExpenses = (request, response) => {
    Expense.aggregate([
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' },
        },
      },
    ])
      .then((result) => {
        if (result && result.length > 0) {
          response.json({ totalExpenses: result[0].totalExpenses });
        } else {
          response.json({ totalExpenses: 0 });
        }
      })
      .catch((err) => {
        console.error(err);
        response.status(500).json(err);
      });
  };


