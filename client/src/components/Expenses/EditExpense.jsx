import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';


const EditExpense = () => {
  const { id } = useParams();
  const navigate= useNavigate();
  const socket = io('http://localhost:8000'); 
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });
  useEffect(() => {
    axios.get(`http://localhost:8000/api/get/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setFormData(res.data); 
        } else {
          console.error(`Failed to fetch expense data. Status code: ${res.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  useEffect(() => {
    socket.on('expenseData', (expense) => {
      setFormData(expense); 
    });

    // ...
  }, [socket]);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.put(`http://localhost:8000/api/expenses/edit/${id}`, formData)
//       .then((res) => {
//         if (res.status === 200) {
//           navigate('/expenses');
//         } else {
//           console.error(`Failed to update the expense. Status code: ${res.status}`);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
const EditExpense = () => {
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

  return (
    <Container>
      <h2>Edit Expense</h2>
      <Form onSubmit={EditExpense}>
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

        <Button variant="primary" onClick={EditExpense}>
          Update Expense
        </Button>
      </Form>
    </Container>
  );
};

export default EditExpense;
