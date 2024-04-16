import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BookEventForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventid');
  const price = searchParams.get('price');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/events/book', {
        eventId,
        name,
        mobileNumber,
        price,
      });
      console.log(response.data);
      alert("We will call you for confirmation")
      navigate('/events');
      // Handle success, maybe navigate to a success page
    } catch (err) {
      console.error(err);
      setError('Error booking event');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book Event</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            disabled // Price is disabled for user input
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Book Tickets</button>
        </div>
      </form>
    </div>
  );
}
