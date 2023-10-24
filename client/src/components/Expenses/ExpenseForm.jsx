import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Button/Button,';
import { plus } from '../utils/Icons';
function ExpenseForm() {
    const [error, setError] = useState('');
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = (name, value) => {
        setInputState({ ...inputState, [name]: value });
        setError('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !amount || !date || !category) {
            setError('All fields are required.');
            return;
        }

        // Handle your form submission or API request here

        setInputState({
            title: '',
            amount: '',
            date: null,
            category: '',
            description: '',
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="mb-3">
                <input
                    type="text"
                    value={title}
                    className="form-control"
                    placeholder="Expense Title"
                    onChange={(e) => handleInput('title', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    value={amount}
                    className="form-control"
                    placeholder="Expense Amount"
                    onChange={(e) => handleInput('amount', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => handleInput('date', date)}
                />
            </div>
            <div className="mb-3">
                <select
                    value={category}
                    className="form-select"
                    onChange={(e) => handleInput('category', e.target.value)}
                >
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="mb-3">
                <textarea
                    value={description}
                    className="form-control"
                    placeholder='Add A Reference'
                    onChange={(e) => handleInput('description', e.target.value)}
                ></textarea>
            </div>
            <div className="mb-3">
                <Button
                    name={'Add Expense'}
                    icon={plus} // Replace with the actual plus icon class or element
                    className="btn btn-primary"
                />
            </div>
        </form>
    );
}

export default ExpenseForm;
