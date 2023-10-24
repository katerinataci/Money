import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import Login from './components/Log/LogIn';
import Register from './components/Log/Register';
import Income from './components/Incomes/Incomes';
import Expense from './components/Expenses/Expense';
import Dashboard from './components/Dashboard/Dashboard';
import Savings from './components/Savings';
import io from 'socket.io-client';
import Main from './components/views/Main';
import Detail from './components/Update/Detail';
import Form from './components/Update/Form';
import Update from './components/Update/Update';
import Logout from './components/Log/Logout';
import EditExpense from './components/Expenses/EditExpense';




const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

function App() {
  const logedIn = localStorage.getItem('userId');
  const [stateLoged, setStateLoged] = useState(false);

  useEffect(() => {
    console.log("testtt");
  }, [stateLoged]);

  return (
    <BrowserRouter>
      {logedIn ? (
        <Routes>
          <Route element={<Login setStateLoged={setStateLoged} />} path="/login" />
          <Route element={<Register setStateLoged={setStateLoged} />} path="/register" />
          <Route element={<Logout setStateLoged={setStateLoged} />} path="/logout" />
          <Route element={<Main socket={socket} />} path="/transaction" />
          <Route element={<Detail />} path="/transaction/:id" />
          <Route element={<Update />} path="/transaction/edit/:id" />
          <Route element={<Form />} path="/form" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<EditExpense />} path="/expenses/edit/:id" />
          <Route element={<Savings />} path="/savings" />
          <Route element={<Income />} path="/incomes" />
          <Route element={<Expense />} path="/expenses" />
          <Route element={<HomePage />} path="/" />
        </Routes>
      ) : (
        <Routes>
          <Route element={<HomePage />} path="/" />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
