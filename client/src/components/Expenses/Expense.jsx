import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Expense =()=> {
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [updated,setUpdated]=useState(false)
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        type: 'expense',
    });
    const addExpense = () => {
        axios
            .post("http://localhost:8000/api/add-expense", formData)
            .then((res) => {
              
                setExpenses([...expenses, res.data]);
                localStorage.setItem('expenses', JSON.stringify([...expenses, res.data]));

                setFormData({
                    title: '',
                    amount: '',
                    date: '',
                    category: '',
                    description: '',
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    const updateLocalExpenses = (updatedExpenses) => {
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    };
    const fetchLocalExpenses = () => {
        const localExpenses = JSON.parse(localStorage.getItem('expenses'));
        if (localExpenses) {
            setExpenses(localExpenses);
        }
    };
    const deleteExpense = (id) => {
        axios.delete(`http://localhost:8000/api/delete-expense/${id}`)
          .then((res) => {
            if (res.status === 200) {
            
              const updatedExpenses = expenses.filter((expense) => expense.id !== id);
              setExpenses(updatedExpenses);
              updateLocalExpenses(updatedExpenses);

            } else {
              console.error(`Failed to delete expense. Status code: ${res.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
    useEffect(() => {
        fetchLocalExpenses(); 
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = { ...formData, id: Date.now() };
        addExpense(newExpense);
        setFormData({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            type: 'expense',
        });
    };

 
    useEffect(() => {
        axios.get("http://localhost:8000/api/calculate")
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data;
                    if (data && data.totalExpenses !== undefined) {
                        setTotalExpense(data.totalExpenses); // Corrected key
                    } else {
                        console.error('Invalid or missing data in the response.');
                    }
                } else {
                    throw new Error(`Network response was not ok: ${res.status}`);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    
 

    return (
        <div className="container">
            <h1>Expenses</h1>
            {/* <h2 className="total-income">Total Expenses: <span>${totalExpense}</span></h2> */}
            <div className="row expense-content">
                <div className="col-md-6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit"> {/* Cute green color */}
                            Add Expense
                        </Button>
                    </Form>
                </div>
                <div className="col-md-6">
                    {expenses.map((expense) => (
                        <div key={expense.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{expense.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">${expense.amount}</h6>
                                <p className="card-text">{expense.description}</p>
                                <p className="card-text">{expense.date}</p>
                                <Button variant="danger" onClick={() => deleteExpense(expense.id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/dashboard">
                Explore Your Financial Status
                Visit the Dashboard!
            </Link>

        </div>
    );
}

export default Expense;
