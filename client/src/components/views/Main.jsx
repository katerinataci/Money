import React, { useState } from 'react'
import axios from 'axios';
import io from 'socket.io-client';
import Form from '../Update/Form';
import List from '../Update/List';
const Main = (props) => {
    const { socket } = props

    const [transaction, setTransaction] = useState([]);
    const [update, setUpdate] = useState(false);
    return (
        <div className='row d-flex align-items-start'>
            <Form socket={socket} transaction={transaction} update={update} setUpdate={setUpdate} setTransaction={setTransaction} />
            {/* <h2> Person List</h2> */}
            <List socket={socket} transaction={transaction} update={update} setUpdate={setUpdate} setTransaction={setTransaction} />
        </div>
    )
}
export default Main;