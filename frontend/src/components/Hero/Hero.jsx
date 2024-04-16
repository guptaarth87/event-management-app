import React from 'react'
import Heroimg from '../../assets/heroimg.svg';
import './Hero.css';

export default function Hero() {
  return (
    <>
    <div className="container">
        <div className="row m-2">
            <div className="col-lg-6 col-md-5 col-sm-11">
                <br></br>
                <br></br>
                <br></br>
               <h2 className='text-primary highlight '>EventX</h2>
               <h4 className=''>Experience the thrill of live entertainment with EventX - your one-stop destination for booking tickets to shows, concerts, and more! Discover, book, and enjoy unforgettable experiences with ease.</h4>
               <br></br>
               <h4>Explore Events Section.</h4>

            </div>
            <div className="col-1"></div>
            <div className="col-lg-5 col-md-5 col-sm-11">
            <img src={Heroimg} className="animated col-10" />
           
            
            </div>
           
        </div>
    </div>
    </>
  )
}
