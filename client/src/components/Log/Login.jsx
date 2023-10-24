import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = ({setStateLoged}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors,setErrors]=useState({})

  const login = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/users/login', {
      email,
      password,
    },
    { withCredentials: true })
    .then(res => {
      console.log(res);
      console.log(res.data);
      localStorage.setItem("userId", res.data.userId);
      setStateLoged(true)
      

      setEmail("");
      setPassword("");
      setErrors({})
      
      navigate('/')
      if(res.status===400  || !res){
        window.alert("invalid  credentials")
      }else{
        window.alert(" Log In successfull")
      }
    })
    .catch(err => {
      console.log(err.res.data);
      setErrors(err.res.data.message)
    });
  }

  return (

    <div className="bg-image">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-3">
              <h2 className="text-center">Log In</h2>
              <form onSubmit={login}>
                <p className='text-danger'>{errorMessage ? errorMessage : ""}</p>

                <div className="mb-3">
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
                <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="register"
                class="link-danger btn-secondary">Register</a></p>
             

              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
