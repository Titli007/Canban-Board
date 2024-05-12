import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get the stored email and password from local storage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    console.log(localStorage.getItem('email'))

    // Check if the entered email and password match the stored values
    if (email === storedEmail && password === storedPassword) {
      console.log('Login successful!');
      localStorage.setItem('loggedIn', 'true');
      // Optionally, you can reset the form fields after successful login
      setEmail('');
      setPassword('');
      navigate('/')
      // You can redirect the user to the desired page or perform additional actions
    } else {
      console.log('Invalid email or password');
      // You can display an error message or perform additional actions
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-blue-50 rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              email:
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
          <span className="text-gray-700 font-bold mr-1 ">New User?</span>
          <button className="underline text-blue-600 mt-3 text-lg" onClick={()=>navigate('/signup')}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;