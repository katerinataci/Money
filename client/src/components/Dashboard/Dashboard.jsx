import React, { useEffect, useState } from 'react';
import Chart from '../Chart/Chart';
import { dollar } from '../utils/Icons';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState({});
    useEffect(() => {
        const getIncomes = async () => {
            try {
                const response = await axios.get("https://localhost:8000/api/get-incomes");
                setIncomes(response.data);
            } catch (error) {
                setError(error);
            }
        };
        const getExpenses = async () => {
            try {
                const response = await axios.get("https://localhost:8000/api/get-expenses");
                setExpenses(response.data);
            } catch (error) {
                setError(error);
            }
        };

        getIncomes();
        getExpenses();
    }, []);

    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalBalance = totalExpenses - totalIncome;

    return (
        <div>
            
            <h1>All Transactions</h1>
            <div className="stats-con">
                <div className="chart-con">
                    <Chart />
                    <div className="amount-con">
                        <div className="income">
                         
                            <Link to="/incomes" className="btn btn-primary "style={{ backgroundColor: "green" }}>Add Income</Link>
                        </div>
                        <div className="expense">
                          
                            <Link to="/expenses" className="btn btn-primary" style={{backgroundColor:"red"}}>Add Expense</Link>
                        </div>
                        <div className="savings">
                     
                         <Link to="/savings" className="btn btn-primary">Calculate Savings</Link>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
