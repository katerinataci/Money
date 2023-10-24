import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({setStateLoged}) => {
  const navigate= useNavigate()
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
     
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", user, {
            withCredentials: true,
        },)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            localStorage.setItem('isLogedIn', true);
            setStateLoged(true)
            navigate("/login")
            setUser({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              
            });
            setConfirmReg("Thank you for registering. You can log in now.");
            // window.alert("Thank you for registering. You can log in now.")
            setErrors({});
            if(res.status===400  || !res){
              window.alert("already used details")
            }else{
              window.alert("Thank you for registering. You can log in now.")
            }
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        });
    };

    return (
      <div>
      <div className="bg-image" style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaGB68MvqL-dwF71LJElPVDCNXK0DpO4--g6RfrIvhfpyNO07M3GaW92c8h5rdeqqjVw&usqp=CAU")', height: "100vh" }}>
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
            <div className="card-body py-5 px-md-5">
              <h2 className="text-center mb-4 color-red">Every penny counts!</h2>
              <h2 className="text-center mb-4 color-red">Sign Up Here!</h2>
              {confirmReg ? <h2 style={{ color: 'green', textAlign: 'center' }}>{confirmReg}</h2> : ""}
              <form onSubmit={register} method='post'>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">User Name</label>
                  <input type="text" id="name" name="name" onChange={handleChange} className="form-control" />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" id="email" name="email" onChange={handleChange} className="form-control" />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" id="password" name="password" onChange={handleChange} className="form-control" />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} className="form-control" />
                  {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                </div>
                {/* <p>
            { errors.role? <p>{errors.role.message}</p> : "" }
                <label>Role</label><br/>
                <select name="" onChange = {(e)=>setRole(e.target.value)} id="" >
                    <option value={""}>Select</option>
                    <option value={"student"}>student</option> 
                    <option value={"admin"}>admin</option>          
                </select>
           
            </p> */}
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                <div className="d-flex justify-content-center">
                <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="login"
                class="link-danger btn-secondary">Sign In</a></p>
                 
                 
                
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Register;
