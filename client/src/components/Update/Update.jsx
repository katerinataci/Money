import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
const Update = (props) => {
    const { id } = useParams(); //this process is identical to the one we used with our Details.js component
    const [date, setDate] = useState();
    const [description, setDescription] = useState();
    const [descriptionVal, setDescriptionVal] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
        axios.get('http://localhost:8000/api/transaction/' + id)
            .then(res => {
                setDate(res.data.firstName);
                setDescription(res.data.lastName);
            })
            .catch(err => console.log(err))
    }, [])
    const updateTransaction = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/transasction/' + id, {
            date,    // this is shortcut syntax for firstName: firstName,
            description      // this is shortcut syntax for lastName: lastName
        })
            .then(res => {
                if ( res.data === "egzists") {
                    setDescriptionVal(res.data)
                } else{
                    navigate("/");
                
            }
//                
                console.log("response"+JSON.stringify(res.data) );


                 // this will take us back to the Main.js
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Update a Transaction</h1>
            <form onSubmit={updateTransaction}>
                <p>
                {date ? <p>  {date }</p>  : ""}
                    <label>Date</label><br />
                    <input type="text" 
                    name="date" 
                    value={date} 
                    onChange={(e) => { setDate(e.target.value) }} />
                </p>
                <p>
                {descriptionVal ? <p>  {descriptionVal }</p>  : ""}
                    <label>Description</label><br />
                    <input type="text" 
                    name="description"
                    value={description} 
                    onChange={(e) => { setDescription(e.target.value) }} />
                </p>
                <input type="submit" />
            </form>
        </div>
    )
}
export default Update;

