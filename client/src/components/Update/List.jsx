import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = (props) => {
     const { transaction, setTransaction, update,setUpdate ,socket} = props;
   
    useEffect(() => {
        axios.get("http://localhost:8000/api/transaction")
            .then((res) => {
                // console.log(res.data);
                setTransaction(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            socket.on('toClient', (person) => {
                console.log("ne react therritet ")
                // setPeople([...people,persons]);
       
                setUpdate(!update)
              });
              // return () => socket.emit("disconnect");
    }, [update])

    const deleteTransaction = (transactionId) => {
        axios.delete('http://localhost:8000/api/transaction/' + transactionId)
            .then(res => {
                // setUpdate(!update)
                socket.emit("toServer", res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='col-sm-6'>
            {
                <table class="table  table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {transaction.map((transaction, index) => (
                
                  <tr key={index}>
                    <th scope="row">{index +1}</th>
                    <td className='align-items-center  '><Link  to={`/transaction/${transaction._id}`}> <p > {transaction.date}</p> </Link></td>
                    <td className='align-items-center  '>{transaction.description}</td>
                    <td className='row justify-content-around  '> <Link className=' btn-sm btn btn-secondary mb-2' to={"/transaction/edit/" + transaction._id}>
                            Edit
                        </Link>

                        
                        <button className=' btn btn-danger btn-sm' onClick={(e)=>{deleteTransaction(transaction._id)}}>
                            Delete
                        </button>
                    </td>
                  </tr>
                  
                  ))}
                 
                </tbody>
              </table>

                
                       
                    
            }
        </div>
    )
}
export default List;

