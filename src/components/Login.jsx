import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate('/item-form');
      })
      .catch((error) => {
        console.error('Login failed:', error.message);
        alert('Please fill correct Login field')
      });
  };

  return (
    <div className="bg-background min-h-screen flex justify-center items-center">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-primary mb-6 text-center font-semibold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-3 w-full border border-secondary rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 p-3 w-full border border-secondary rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-primary text-[#ffff] p-3 rounded-lg hover:bg-secondary transition">
          Login
        </button>

        <Link to="/" className="block text-center mt-4 text-secondary hover:underline">
          Don't have an account? Sign up
        </Link>

      </div>
    </div>
  );
};

export default Login;
