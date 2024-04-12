import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../_helper';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { "username":username,"password": password });
      console.log(response)
      console.log({ username, password }); // Log the response data
      navigate('/events'); // Navigate to /bookevent on success
    } catch (err) {
      console.error(err);
      setError('Invalid credentials'); // Display error message
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card col-lg-5 col-md-5 col-sm-11">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <br></br>
          <h6>Don't have accoun? <button className="btn btn-primary" onClick={()=>{navigate('/signup')}}>SignUp</button></h6>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
