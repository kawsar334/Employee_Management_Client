
import React, { useEffect } from 'react';
import Banner from '../../components/banner/Banner';
import Services from '../../components/services/Services';
import Testimonials from '../../components/testimonials/Testimonials';
import AboutUs from '../../components/AboutUs/AboutUs';
import CallToAction from '../../CallToAction/CallToAction';
import { toast } from 'react-toastify';

const Home = ({ user }) => {


  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/user/userList', {
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

  const role = "admin"
  return (
    <div>
      <Banner/>

      
      <Services/>

      {/* Admin or HR Specific Content */}
      {role === 'admin' && (
        <section className="py-20 bg-gray-200 text-center">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p>Welcome to the Admin Dashboard. Here you can manage users, view reports, and configure settings.</p>
        </section>
      )}

      {role === 'hr' && (
        <section className="py-20 bg-gray-200 text-center">
          <h2 className="text-3xl font-bold">HR Dashboard</h2>
          <p>Welcome to the HR Dashboard. Here you can manage employees and monitor workplace analytics.</p>
        </section>
      )}
     

      <Testimonials/>
      <AboutUs/>

      <CallToAction/>

    </div>
  );
};

export default Home;
