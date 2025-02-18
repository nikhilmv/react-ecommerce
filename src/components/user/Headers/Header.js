import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
 
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {

 
  const cartItems = useSelector((state) => state.cartItems.cartItems);

  return (

    <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10">

      {/* <!-- navbar container --> */}
      <div className="w-full sm:w-full lg:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">

        {/* <!-- logo & search container --> */}
        <div className="flex items-center flex-1 ">
          <Link className="h-7 mr-1 sm:mr-4" to="/">
            <img draggable="false" className="h-full w-full object-contain" src={logo} alt="Flipkart Logo" />
          </Link>

          <Searchbar />
        </div>
        {/* <!-- logo & search container --> */}

        {/* <!-- right navs --> */}
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

         
            <Link to="/login" className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer">Login</Link>
 
           
    
          <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
            <span><ShoppingCartIcon /></span>
              {cartItems.length > 0 &&
                <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                  {cartItems.length}
                </div>
              }
            Cart
          </Link>
        </div>
        {/* <!-- right navs --> */}

      </div>
      {/* <!-- navbar container --> */}
    </header>
  )
};

 