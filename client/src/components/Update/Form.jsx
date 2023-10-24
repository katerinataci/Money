import React, { useState,useNavigate } from 'react'
import axios from 'axios';

const Form = (props) => {
    const [date, setDate] = useState(""); 
    const [description, setDescription] = useState("");
    const {socket} = props
 
    const {setTransaction,transaction ,setUpdate,update} = props;
    const [ errors,setErrors] = useState([])
     

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/transaction', {
            date,    
            date     
        })
            .then(res=>{
                console.log(res.data)
                navigate("/dashboard")
                if (res.data.errors) {
                    setErrors(res.data.errors);
          
                }
                
    
                else{
                    setDate("")
                    setDescription("")
                    setErrors("");
                setUpdate(!update)
                console.log("sapo nisa nje request tek server")
                socket.emit("toServer", res.data);
            }

            })
            .catch(err=>{
                // setErrors(err.data.errors);
                console.log("erorrTEst:"+ JSON.stringify(err))
            }
                )
    }
    
    
    return (
        <form className='col-sm-3' onSubmit={onSubmitHandler}>
            <p>
            

                <label>Date</label><br/>
                    {errors.date ?  <p>  {errors.date.message }</p>  : ""}
                 
                <input type="text" value={date} onChange = {(e)=>setDate(e.target.value)}/>
            </p>
            <p>
                <label>Description</label><br/>
                {errors.description ?  <p>  {errors.description.message }</p>  : ""}

                <input type="text" value={description} onChange = {(e)=>setDescription(e.target.value)}/>
            </p>
            <input  type="submit"/>
        </form>
    )
}
export default Form;

