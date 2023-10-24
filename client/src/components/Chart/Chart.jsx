import React, { useState, useEffect } from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { dateFormat } from '../utils/dateFormat';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart() {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const navigate=useNavigate();
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('date');
    const [update, setUpdate] = useState(false);
    const socket = io('http://localhost:8000');

    const handleEditExpenseClick = (expense) => {
        socket.emit('expenseData', expense);
        navigate(`/expenses/edit/${expense.id}`);
    };


    useEffect(() => {

        axios.get("http://localhost:8000/api/get-income")
            .then((res) => {
                setIncomes(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        axios.get("http://localhost:8000/api/get-expense")
            .then((res) => {
                setExpenses(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const totalBalance = () => {
        const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        return totalIncome - totalExpenses;
    }


    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        if (sortOrder === 'date') {
            history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortOrder === 'amount') {
            history.sort((a, b) => a.amount - b.amount);
        }
        return history.slice(0, 3);
    }
    const deleteTransaction = (transactionId) => {
        axios.delete('http://localhost:8000/api/delete-transaction/' + transactionId)
            .then(res => {
                setUpdate(!update)

            })
            .catch(err => console.log(err))
    }


    const chartData = {
        labels: incomes.map((inc) => dateFormat(inc.date)),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                backgroundColor: 'green',
                borderColor: 'green',
                tension: 0.2,
                fill: false,
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount),
                backgroundColor: 'red',
                borderColor: 'red',
                tension: 0.2,
                fill: false,
            },
        ],
    };
    const chartOptions = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                },
            },
        },
    };

    return (
        <div className="bg-light p-3 border rounded">
            <div className="balance">
                <p>Total Balance: ${totalBalance()}</p>
            </div>
            <Line data={chartData} options={chartOptions} />
            <div className="history">
                <h3>Recent Transactions</h3>
                <div>
                    <input onChange={e => setFilter(e.target.value)} type='text' placeholder='Search by Amount or Date' />
                    <button onClick={() => setSortOrder('date')}>Sort By Amount</button>
                    <button onClick={() => setSortOrder('amount')}>Sort By Date</button>
                </div>

                <table className="table table-striped table-bordered table-info">

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>

                    </thead>
                    <tbody>
                        {transactionHistory().map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.title}</td>
                                <td>${transaction.amount}</td>
                                <td>{dateFormat(transaction.createdAt)}</td>
                                <td>


                                    <Link to="/incomes" className="btn btn-primary " style={{ backgroundColor: "green" }}> Edit Income</Link>

                                </td>
                                <td>
                                <Link to="/expenses" className="btn btn-primary " style={{ backgroundColor: "green" }}> Edit Expense</Link>

                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default Chart;
