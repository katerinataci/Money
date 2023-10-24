const Income=require("../models/income.model")
const Transaction = require("../models/transaction.model"); 
module.exports.index = (request, response) => {  
  response.json({     
     message: "Connected"
  });
}
module.exports.createIncome = (req, res) => {
  Income.create(req.body) 
  .then(income => res.json(income))
  .catch(err => res.status(500).json(err)); 
};
module.exports.getAllIncome = (request, response) => {
  Income.find({}).sort({ name: 'asc' })
    .then(incomes => {
      response.json(incomes);
    })
    .catch(err => {
      console.error(err); 
      response.status(500).json(err); 
    });
};
module.exports.getIncome = (request, response) => {
  const id = request.params.id
  Income.findOne({_id:id})
      .then(income => response.json(income))
      .catch(err => response.json(err));
}
module.exports.deleteIncome = (request, response) => {
  Income.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
      .then(deleteConfirmation => response.json(deleteConfirmation))
      .catch(err => response.json(err))
}
module.exports.deleteTransaction = (req, res) => {
  const id = req.params.id;
  Transaction.deleteOne({ _id: id })
    .then((deleteConfirmation) => {
      if (deleteConfirmation.deletedCount === 1) {
  
        res.json({ success: true, message: 'Transaction deleted' });
      } else {

        res.status(404).json({ success: false, message: 'Transaction not found' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error deleting transaction' });
    });
};
module.exports.updateIncome = (request, response) => {
  const id = request.params.id;
  const updatedIncomeData = request.body;

  Income.findOneAndUpdate(
    { _id: id },
    updatedIncomeData,
    { new: true }
  )
    .then(updatedIncome => {
      if (!updatedIncome) {
        return response.status(404).json({ error: 'Income not found' });
      }
      response.json(updatedIncome);
    })
    .catch(err => {
      console.error(err);
      response.status(500).json(err);
    });
};
module.exports.TotalIncomes = (request, response) => {
  Income.aggregate([
    {
      $group: {
        _id: null,
        totalIncomes: { $sum: '$amount' },
      },
    },
  ])
    .then((result) => {
      if (result && result.length > 0) {
        response.json({ totalIncomes: result[0].totalIncomes });
      } else {
        response.json({ totalIncomes: 0 });
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json(err);
    });
};
