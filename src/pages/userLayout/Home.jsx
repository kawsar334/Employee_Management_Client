
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import Banner from '../../components/banner/Banner';
// import Categories from '../../components/categories/Categories';
// import { useQuery } from '@tanstack/react-query';
// import Loader from '../../components/Loader';

// const fetchProduct = async () => {
//   const { data, } = await axios.get('https://server-anud.vercel.app/api/product/productList'); 
//   return data;
// };


// const Home = () => {

 
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['product'], 
//     queryFn: fetchProduct,
//     staleTime: 1000 * 60 * 5, 
//     cacheTime: 1000 * 60 * 10, 
//   });

//   if (isLoading) return <Loader/>;
//   if (error) return <p className="text-center text-red-500"> {error.message}</p>;

 
//   return (
//     <div>
//       <Banner />
//       <Categories products={data?.data} />

//     </div>
//   );
// };

// export default Home;


import React from 'react';
import Banner from '../../components/banner/Banner';
import Services from '../../components/services/Services';
import Testimonials from '../../components/testimonials/Testimonials';
import AboutUs from '../../components/AboutUs/AboutUs';
import CallToAction from '../../CallToAction/CallToAction';

const Home = ({ user }) => {

  const role = "admin"
  return (
    <div>
      <Banner/>
      
      {/* Services Section */}
      
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
