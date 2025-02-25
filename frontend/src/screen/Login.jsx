import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios  from '../config/axios';
import { useContext } from 'react';
import { UserContext } from '../context/user.context';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
   axios.post('/users/login',{email,password})
   .then((res)=>{

    console.log(res.data)

    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    navigate('/')
   }).catch((err)=>{
       console.log(err.response.data)
   })

  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-300">
          Dont have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login