
import React, { useEffect } from 'react';
import Banner from '../../components/banner/Banner';
import Services from '../../components/services/Services';
import Testimonials from '../../components/testimonials/Testimonials';
import AboutUs from '../../components/AboutUs/AboutUs';
import CallToAction from '../../CallToAction/CallToAction';
import { toast } from 'react-toastify';
import Features from '../../Features/Features';

const Home = ({ user }) => {


  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://server-wheat-xi.vercel.app/api/user/userList', {
          method: 'GET', 
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    
      } catch (err) {
        // toast.error("error on home page")
        console.error('Error fetching data:', err);
      }
    };

    // getData();
  }, []);

  return (
    <div>
      <Banner/>

      
      <Services/>   
     
      <Testimonials/>
      <Features/>
      
      <AboutUs/>

      <CallToAction/>

    </div>
  );
};

export default Home;
