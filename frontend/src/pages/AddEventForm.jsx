import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddEventForm() {
  const [name, setName] = useState('');
  const [slotsAvailable, setSlotsAvailable] = useState('');
  const [price, setPrice] = useState('');
  const [mealType, setMealType] = useState('None');
  const [photographyPlan, setPhotographyPlan] = useState('Silver');
  const [events, setEvents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/events/add', {
        name,
        slotsAvailable: parseInt(slotsAvailable),
        price: parseInt(price),
        mealType,
        photographyPlan,
      });
      setSuccessMessage(response.data);
      fetchEvents(); // Fetch events again to update the list
    } catch (err) {
      setErrorMessage('Error adding event');
      console.error(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      setEvents(response.data);
    } catch (err) {
      console.error(err);
      setErrorMessage('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Event</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Event Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="slotsAvailable" className="form-label">Slots Available</label>
        <input
          type="number"
          className="form-control"
          id="slotsAvailable"
          value={slotsAvailable}
          onChange={(e) => setSlotsAvailable(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mealType" className="form-label">Meal Type</label>
        <select
          className="form-select"
          id="mealType"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Main course+drink">Main course+drink</option>
          <option value="Main course+starter+drink">Main course+starter+drink</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="photographyPlan" className="form-label">Photography Plan</label>
        <select
          className="form-select"
          id="photographyPlan"
          value={photographyPlan}
          onChange={(e) => setPhotographyPlan(e.target.value)}
        >
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
        </select>
      </div>
      <div className="text-center">
        <button type="button" className="btn btn-primary" onClick={handleAddEvent}>Add Event</button>
      </div>
      <hr />
      <h2 className="text-center mb-4">All Events</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {events.map((event) => (
          <div className="col" key={event._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">Slots Available: {event.slotsAvailable}</p>
                <p className="card-text">Price: {event.price}</p>
                <p className="card-text">Meal Type: {event.mealType}</p>
                <p className="card-text">Photography Plan: {event.photographyPlan}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
