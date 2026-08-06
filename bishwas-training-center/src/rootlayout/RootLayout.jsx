import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
       <div>
           <div className='sticky top-0 z-1'>
             <Navbar></Navbar>
           </div>
            <div>
                <Outlet></Outlet>
                
            </div>
            <div>
                <Footer></Footer>
            </div>
            
        </div>
    );
};

export default RootLayout;