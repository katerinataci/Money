import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Income() {
    const [incomes, setIncomes] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        type: 'income',
    });
    const addIncome = () => {
        axios
            .post("http://localhost:8000/api/add-income", formData)
            .then((res) => {
                setIncomes([...incomes, res.data]);
                localStorage.setItem('incomes', JSON.stringify([...incomes, res.data]));
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
    const fetchLocalIncomes = () => {
        const localIncomes = JSON.parse(localStorage.getItem('incomes'));
        if (localIncomes) {
            setIncomes(localIncomes);
        }
    };

    useEffect(() => {
        fetchLocalIncomes();
    }, []);

    const updateLocalIncomes = (updatedIncomes) => {
        localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
    };

    const deleteIncome = (id) => {
        axios.delete(`http://localhost:8000/api/delete-income/${id}`)
            .then((res) => {
                if (res.status === 200) {

                    const updatedIncomes = incomes.filter((income) => income.id !== id);
                    setIncomes(updatedIncomes);
                    updateLocalIncomes(!updatedIncomes);
                } else {
                    console.error(`Failed to delete income. Status code: ${res.status}`);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const newIncome = { ...formData, id: Date.now() };
        addIncome(newIncome);
        setFormData({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            type: 'income',
        });
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/calculate-incomes") 
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data;
                    if (data && data.totalIncomes !== undefined) {
                        setTotalIncome(data.totalIncomes);
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

            <h1>Incomes</h1>
            {/* <h2 className="total-income">Total Income: <span>${totalIncome}</span></h2> */}
            <div className="row income-content">
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
                            Add Income
                        </Button>
                    </Form>
                </div>
                <div className="col-md-6">
                    {incomes.map((income) => (
                        <div key={income.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{income.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">${income.amount}</h6>
                                <p className="card-text">{income.description}</p>
                                <p className="card-text">{income.date}</p>
                                <Button variant="danger" onClick={() => deleteIncome(income.id)}>
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

export default Income;
