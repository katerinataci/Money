import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
const Detail = (props) => {
    const [transaction, setTransaction] = useState({})
    const {id} = useParams(); 
    useEffect(() => {
        axios.get("http://localhost:8000/api/transaction/" + id)
            .then( res => {
                console.log(res.data);
                setTransaction(res.data);
            })
            .catch( err => console.log(err) );
    }, []);
    return (
        <div>
            <p>Date: {transaction.date}</p>
            <p>Description: {transaction.description}</p>
        </div>
    );
}
export default Detail;

