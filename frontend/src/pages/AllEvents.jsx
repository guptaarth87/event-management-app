import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from '../components/carousel/Carousel';
import Hero from '../components/Hero/Hero';

export default function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div  className="mt-4">
      <Carousel/>
      <div className="container">
        <Hero/>
      <h2 className="text-center mb-4">All Events</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {events.map((event) => (
          <div className="col" key={event._id}>
            <div className="card h-100">
              <div className="card-body">
                <h4 className="card-title">{event.name}</h4>
                <p className="card-text">Slots Available: {event.slotsAvailable}</p>
                <p className="card-text">Price: {event.price}</p>
                
                <Link to={`/bookform?eventid=${event._id}&price=${event.price}`} className="btn btn-primary">Book Tickets</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
