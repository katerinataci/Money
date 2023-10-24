import React from 'react';
import Button from '../Button/Button,';
import { dateFormat } from '../utils/dateFormat';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {
    const categoryIcon = () => {
        switch (category) {
            case 'salary':
                return 'Money Icon'; // Replace with the actual money icon class
            case 'freelancing':
                return 'Freelance Icon'; // Replace with the actual freelance icon class
            // Add cases for other categories
            default:
                return '';
        }
    };

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return 'Book Icon'; // Replace with the actual book icon class
            case 'groceries':
                return 'Food Icon'; // Replace with the actual food icon class
            // Add cases for other expense categories
            default:
                return '';
        }
    };

    return (
        <div className="card bg-light mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-header" style={{ background: indicatorColor }}>
                <div className="icon">
                    {type === 'expense' ? expenseCatIcon() : categoryIcon()}
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>
                            {amount} USD
                        </p>
                        <p>
                            {dateFormat(date)}
                        </p>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon="Trash Icon" // Replace with the actual trash icon class
                            className="btn btn-danger"
                            style={{ borderRadius: '50%', padding: '1rem', backgroundColor: 'var(--primary-color)', color: '#fff' }}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomeItem;
