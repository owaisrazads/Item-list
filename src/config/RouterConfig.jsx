import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import ItemForm from '../components/ItemForm';
import SignUp from '../components/Signup';

const RouterConfig = ({ user, setUser }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/item-form" element={<ItemForm user={user} />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
