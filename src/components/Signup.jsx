import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (image) {
          const imageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(imageRef, image);
          const photoURL = await getDownloadURL(imageRef);

          await updateProfile(user, {
            displayName: name,
            photoURL: photoURL,
          });
        } else {
          await updateProfile(user, {
            displayName: name,
          });
        }
        navigate('/login');
      })
      .catch((error) => {
        console.error('Sign-up failed:', error.message);
        alert('Please fill correct Signup field')
      });
  };

  return (
    <div className="bg-background min-h-screen flex justify-center items-center">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-primary mb-6 text-center font-semibold">Create an Account</h2>
        <input
          type="text"
          placeholder="Name"
          className="mb-4 p-3 w-full border border-secondary rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          className="mb-4 p-3 w-full border border-secondary rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 p-3 w-full border border-secondary rounded-lg"
        />
        <button onClick={handleSignUp} className="w-full bg-primary text-[#fff] p-3 rounded-lg hover:bg-secondary transition">
          Sign Up
        </button>


        <Link to="/login" className="block text-center mt-4 text-secondary hover:underline">
          Already have an account? Log in
        </Link>


      </div>
    </div>
  );
};

export default SignUp;
