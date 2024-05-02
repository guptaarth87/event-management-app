import React from 'react'

import contact from './contact.svg';


export default function ContactusPage() {
  return (
    <>
     
      <div className="container margin-top-all-pages">
        <h2 className='text-center mt-4'>Get In Touch With Us</h2>
    <div className="row mt-4">
    <div className="col-lg-7">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5405989675905!2d75.80795475000001!3d22.633624249999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fbe26f30037f%3A0x263258531397d17a!2sSai%20Vihar%20Colony%2C%20Rau%2C%20Indore%2C%20Madhya%20Pradesh%20453331!5e0!3m2!1sen!2sin!4v1714658728053!5m2!1sen!2sin" 
        className='col-12' height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
                        
        <div className=" card col-lg-4 p-3 m-1 position_style_card">
             <div className='alignCentre heading'>Contact Us </div>
           <br></br>
           <img src={contact}  className='img_control_hidden col-lg-6 col-sm-2'/>
           <h5 className=''>Address</h5>
           <div className='description'>20, New sai vihar Colony, Rau</div>
           <br></br>
           <h5 className=''>Phone No </h5>
           <div className='description'>+91 9589004055</div>
        </div>
        
    </div>
      </div>
      
      </>
  )
}
