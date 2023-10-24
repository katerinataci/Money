import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({stateLoged,setStateLoged}) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    axios.post(
      'http://localhost:8000/api/users/logout',
      {},
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        console.log(res.data);{localStorage.removeItem('userId'); setStateLoged(false)};
        navigate('/');
        window.alert("Succesfully Logged Out")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
};

export default Logout;
